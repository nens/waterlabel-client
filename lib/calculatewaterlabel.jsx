function range(lower, upper, value){
  return {
    lower: lower,
    upper: upper,
    value: value,
    within: function(val){
      return this.lower <= val && val < this.upper;
    }
  };
}

function rangedList(type_){
  var list = [];
  var push = function(lower, upper, value){
    list.push(range(lower, upper, value));
  };
  var args = (arguments.length === 1 ? [arguments[0]] :
    Array.apply(null, arguments));
  var seq = args.slice(1, args.length).sort();
  var normal = type_ !== 'boolean' && type_ !== 'gradient';
  if(normal){
    push(-Infinity, seq[0][0], '__BEFORE__');
  }
  for(var i = 0; i < seq.length; i++){
    push(seq[i][0], seq[i][1], seq[i][2]);
  }
  if(normal) {
    push(seq[seq.length - 1][1], Infinity, "__AFTER__");
  }

  var match = function(value){
    var x;
    if(type_ === 'gradient'){
      x = list[0];
      var val = value * x.value;
      if(val <= x.lower) {return x.lower;}
      if(val >= x.upper) {return x.upper;}
      return val;
    } else if(type_ === 'boolean'){
      x = list[0];
      if(!value) {return x.lower;}
      return x.upper;
    }
    for(var i = 0; i < list.length; i++){
      if(list[i].within(value)) {return list[i].value;}
    }
  };

  return {
    push: push,
    match: match
  };
}

const RIOOL = {
  "Gemengd stelsel": 0,
  "Onbekend": 0,
  "Regenwater stelsel": 0.4,
  "Infiltratieriool": 1.0,
  "Tuin": 1.0,
};


// TODO: Infiltratie wordt nog niet gebruikt, maar is voor de openbare ruimte,
// uiteindelijk nodig voor de wegen.
const INFILTRATIE = {
  "Beton": 0,
  "Asfalt": 1,
  "Open asfalt": 2,
  "Klinkers": 3,
  "Grind / infiltratie": 4,
};


var BOOLEAN = {
    "ja": true,
    "nee": false,
};


const RANGES = {
    'afvoer_dak_schuur': rangedList('gradient', [0, 90, 90]),
    'afvoer_dak_woning': rangedList('gradient', [0, 90, 90]),
    'berging_dak_schuur': rangedList('gradient', [0, 50, 50]),
    'berging_dak_woning': rangedList('gradient', [0, 50, 50]),
    'geveltuin': rangedList('boolean', [0, 15, undefined]),
    'groene_achtertuin': rangedList('gradient', [0, 100, 100]),
    'groene_voortuin': rangedList('gradient', [0, 120, 120]),
    'regenton': rangedList('gradient', [0, 20, 0.05])
};



var LABEL = rangedList(
    undefined, [0, 10, "G"], [10, 20, "F"], [20, 40, "E"], [40, 60, "D"],
    [60, 80, "C"], [80, 100, "B"], [100, Infinity, "A"]
);


function zeroDivision(numerator, denominator) {
  var division = parseFloat(numerator) / parseFloat(denominator);
  if (!division) {return 0;}
  else if (division === Infinity){return 0;}
  return division;
}


function boolify(value) {
  if(typeof value === 'string') {
    return BOOLEAN[value.toLowerCase()];
  }
  return Boolean(value);
}


export default function calculateWaterlabel(params={}) {

  // console.table(params);

  var achtertuin = parseInt(params.achtertuin) || 0;
  var afvoer_dak_schuur = params.afvoer_dak_schuur || 'Gemengd stelsel';
  var afvoer_dak_woning = params.afvoer_dak_woning || 'Gemengd stelsel';
  var berging_dak_schuur = parseInt(params.berging_dak_schuur) || 0;
  var berging_dak_woning = parseInt(params.berging_dak_woning) || 0;
  var dak_schuur_garage = parseInt(params.dak_schuur_garage) || 0;
  var dak_woning = parseInt(params.dak_woning) || 0;
  var geveltuin = params.geveltuin || 'nee';
  var groene_achtertuin = parseInt(params.groene_achtertuin) || 0;
  var groene_voortuin = parseInt(params.groene_voortuin) || 0;
  var perceel = parseInt(params.perceel) || 0;
  var regenton = parseInt(params.regenton) || 0;
  var voortuin = parseInt(params.voortuin) || 0;
  if(Math.abs(perceel - dak_schuur_garage - dak_woning - voortuin - achtertuin) >
      0.001 || voortuin < groene_voortuin || achtertuin < groene_achtertuin){
    // return false;
  }

  var dak_totaal = dak_woning + dak_schuur_garage;
  var tuin_totaal = achtertuin + voortuin;

  var fractie_dak_woning = zeroDivision(dak_woning, dak_totaal);
  var fractie_dak_schuur = zeroDivision(dak_schuur_garage, dak_totaal);
  var fractie_voortuin = zeroDivision(voortuin, tuin_totaal);
  var fractie_achtertuin = zeroDivision(achtertuin, tuin_totaal);
  var fractie_tuin = zeroDivision(tuin_totaal, perceel);
  var fractie_dak = zeroDivision(dak_totaal, perceel);
  var woning_afvoer = RIOOL[afvoer_dak_woning];
  var schuur_afvoer = RIOOL[afvoer_dak_schuur];

  geveltuin = boolify(geveltuin);

  var score = RANGES.afvoer_dak_schuur.match(schuur_afvoer *
          fractie_dak_schuur * fractie_dak) +
      RANGES.afvoer_dak_woning.match(woning_afvoer * fractie_dak_woning *
          fractie_dak) +
      RANGES.berging_dak_schuur.match(zeroDivision(berging_dak_schuur,
              dak_totaal) * fractie_dak) +
      RANGES.berging_dak_woning.match(
                zeroDivision(berging_dak_woning, dak_totaal) *
                fractie_dak) +
      RANGES.geveltuin.match(geveltuin) +
      RANGES.groene_achtertuin.match(zeroDivision(groene_achtertuin,
              achtertuin) * fractie_achtertuin * fractie_tuin) +
      RANGES.groene_voortuin.match(zeroDivision(groene_voortuin, voortuin) *
          fractie_voortuin * fractie_tuin) +
      RANGES.regenton.match(regenton);

  return LABEL.match(score);
}
