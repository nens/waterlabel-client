import React, { Component } from 'react';
import styles from './AboutText.css';
import { Grid, Row, Col } from 'react-bootstrap';
import algemeen01 from '../images/algemeen01.png';
import algemeen02 from '../images/algemeen02.png';
import algemeen03 from '../images/algemeen03.png';
import algemeen06 from '../images/algemeen06.png';
import algemeen07 from '../images/algemeen07.png';
import algemeen08 from '../images/algemeen08.png';
import algemeen09 from '../images/algemeen09.png';
import algemeen10 from '../images/algemeen10.png';
import algemeen11 from '../images/algemeen11.png';

class AboutText extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.infobox}>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={9}>
              <h2>Inzicht in de waterberging op eigen terrein </h2>
              <p>
              Op deze site kunnen eigenaren kenmerken van hun perceel invoeren, zoals perceeloppervlak, aantal m2 groene tuin, wel/geen regenton.
<br/> Vervolgens krijgt het perceel een waterlabel van G (veel afvoer naar omliggend gebied) tot A (nauwelijks afvoer naar omliggend gebied).
<br/> Er zijn al bijna twee miljoen gebouwen op deze wijze gelabeld. Veel gemeenten hebben hiervoor een “nul-meting” voor alle gebouwen bepaald. Als u in uw gemeente de waterlabels wilt laten bepalen, neem dan vrijblijvend contact op met <a href="mailto:ria.loschner@nelen-schuurmans.nl">ria.loschner@nelen-schuurmans.nl</a>
              <br/>Telefoonnummer: 030 2330 200
	      <br/> NB: Het waterlabel geeft aan hoeveel regenwater wordt vastgehouden. Het risico op wateroverlast kunt u bepalen op <a href="https://bluelabel.net">www.bluelabel.net</a>.
              </p>
            </Col>
 <Col xs={12} sm={12} md={2}>
              <img style={{ width: 125, padding: 15 }} src={algemeen02} />
            </Col>
            <Col xs={12} sm={12} md={2}>
              &nbsp;
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={9}>
<h2>Uniforme scoringsmethodiek</h2>
              <p>
                STOWA en Stichting RIONED hebben een nieuwe uniforme scoringsmethodiek voor maatregelen tegen wateroverlast op particulier terrein gemaakt.

    Het waterlabel wordt bepaald door de hoeveelheid neerslag (in millimeters) die een perceel kan bergen en laten infiltreren bij een piekbui die in één uur valt. Daarbij gaat het om de gemiddelde berging over het gehele perceel. Het maakt dus niet uit of de eigenaar deze berging op het dak, ondergronds of in de tuin heeft gerealiseerd.
              </p>

            </Col>
            <Col xs={12} sm={12} md={2}>
              <table>
  <tr>
    <th>Berging</th>
    <th>Waterlabel</th>
  </tr>
  <tr>
    <td>0 mm</td>
    <td>G</td>
  </tr>
  <tr>
    <td>&#8805; 2 mm</td>
    <td>F</td>
  </tr>
  <tr>
    <td>&#8805; 7 mm</td>
    <td>E</td>
  </tr>
  <tr>
    <td>&#8805; 18 mm</td>
    <td>D</td>
  </tr>
  <tr>
    <td>&#8805; 30 mm</td>
    <td>C</td>
  </tr>
  <tr>
    <td>&#8805; 44 mm</td>
    <td>B</td>
  </tr>
  <tr>
    <td>&#8805; 60 mm</td>
    <td>A</td>
  </tr>
  <tr>
    <td>&#8805; 80 mm</td>
    <td>A+</td>
  </tr>
  <tr>
    <td>&#8805; 110 mm</td>
    <td>A++</td>
  </tr>
</table>

            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={9}>
              <h2>Maatregelen</h2>
              <p>
                Het is vrij eenvoudig om van een G-label naar F-label te gaan, terwijl de stap van een B-label naar een A-label een grotere opgave is. Hiermee worden mensen die nu helemaal geen water vasthouden op hun perceel gestimuleerd om met eenvoudige maatregelen, zoals een regenton, een beter label te scoren. Maar voor een A-label moet er een grotere inspanning worden geleverd, zoals regenwater van het dak volledig opvangen, of infiltreren op eigen terrein.

              </p>
            </Col>

          </Row>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <h2>Communicatiemiddel en beleidsinstrument</h2>
              <p>
                Naast een communicatiemiddel om bewoners en bedrijven te informeren over mogelijke maatregelen, kunt u ook uw subsidie bijdrage afhankelijk maken van het waterlabel. Daarnaast kunt u het waterlabel gebruiken om uw beleidsambitie te formuleren én te monitoren. Een beleidsambitie kan bijvoorbeeld zijn: “ in 2025 moeten de gebouwen in de gemeente gemiddeld een C label hebben”, en  “alle nieuwbouw moet tenminste een A label hebben”. Om een hoger label te stimuleren zou u ook de rioolheffing kunnen variëren, afhankelijk van het waterlabel.
              </p>
            </Col>
            <Col md={12}>
              <img style={{ width: 200, padding: 15 }} src={algemeen07} />
              <img style={{ width: 250, padding: 15 }} src={algemeen08} />
              <img style={{ width: 250, padding: 15 }} src={algemeen09} />
              <img style={{ width: 250, padding: 15 }} src={algemeen06} />
              <img style={{ width: 250, padding: 15 }} src={algemeen10} />
              <img style={{ width: 250, padding: 15 }} src={algemeen11} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AboutText;
