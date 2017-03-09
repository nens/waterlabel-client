import React, { Component, PropTypes } from 'react';
import styles from './AboutText.css';
import { Grid, Row, Col, Modal, Button, OverlayTrigger } from 'react-bootstrap';
import algemeen01 from '../images/algemeen01.png';
import algemeen02 from '../images/algemeen02.png';
import algemeen03 from '../images/algemeen03.png';
import algemeen04 from '../images/algemeen04.png';
import algemeen05 from '../images/algemeen05.png';
import algemeen06 from '../images/algemeen06.png';
import algemeen07 from '../images/algemeen07.png';
import algemeen08 from '../images/algemeen08.png';
import algemeen09 from '../images/algemeen09.png';
import algemeen10 from '../images/algemeen10.png';

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
              <h2>Wat is het Waterlabel?</h2>
              <p>
              Een huis met een G label, voert regenwater direct af naar de omgeving en kan daardoor wateroverlast in de buurt veroorzaken of verergeren.
              </p>
              <p>
              Een huis met een A label, houdt het regenwater langer vast. Daarmee ontlast het de buurt en draagt bij aan een klimaatbestendige stad.
              </p>
            </Col>
            <Col xs={12} sm={12} md={2}>
              <img style={{ width: 200, padding: 15 }} src={algemeen01} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={9}>
              <h2>Waarom een Waterlabel?</h2>
              <p>
              Hevige neerslag gaat steeds vaker voorkomen. Om de wateroverlast in de stad te beperken moet de overheid maatregelen nemen. Echter, de helft van de stad is particulier terrein. Ook burgers kunnen dus maatregelen treffen om hun stad klimaatbestendiger te maken.
              </p>
              <p>
                Maar hoe bereik je alle inwoners in de stad? Veel mensen weten niet dat ze zelf ook iets kunnen doen.
              </p>
              <p>
                Om de burger bewuster te maken is het regenwaterlabel, kortweg waterlabel, voor woningen ontwikkeld.
                Het waterlabel geeft informatie over de capaciteit van een huis / tuin om water vast te houden.
              </p>
            </Col>
            <Col xs={12} sm={12} md={2}>
              <img style={{ width: 125, padding: 15 }} src={algemeen02} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <h2>Hoe wijzig ik mijn Waterlabel?</h2>
              <p>Dit is mogelijk door op jouw gebouw te klikken en via de knop 'Mijn Waterlabel' jouw maatregelen in te vullen en op te slaan.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={9}>
              <h2>Met welke maatregelen?</h2>
                <p>Het nemen van de juiste maatregelen is maatwerk, maar voorbeelden zijn: meer groen in de voortuin of het doorzagen van de regenpijp naar het riool.</p>
                <p>Kijk vooral eens op één van de websites hiernaast voor goede maatregelen in jouw omgeving.</p>
            </Col>
            <Col xs={12} sm={12} md={2}>
              <div style={{ marginTop: 20, width: 175, padding: 15, border: '1px solid #ccc' }}>
                <p>Tips:</p>
                <ul className='list-unstyled'>
                  <li><a href="http://www.huisjeboompjebeter.nl/" target="_blank">huisjeboompjebeter.nl</a></li>
                  <li><a href="http://www.rainproof.nl/" target="_blank">rainproof.nl</a></li>
                  <li><a href="http://www.waterklaar.nl/" target="_blank">waterklaar.nl</a></li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <h2>Voor wie is het Waterlabel?</h2>
              <p>Van elk huis in Nederland kan een waterlabel worden bepaald. Door dit inzicht worden bewoners water bewuster en gestimuleerd om zelf maatregelen te nemen.</p>
              <p>Het Waterlabel is dus voor iedereen die kan bepalen hoe zijn tuin of dak is ingericht. Dat kunnen bijvoorbeeld huurders, huiseigenaren en VVE’s zijn.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <h2>Welke gegevens zijn gebruikt?</h2>
              <p>Voor de aangesloten gemeenten zijn gegevens verzameld uit het Kadaster en luchtfoto’s. De gegevens zijn automatisch verzameld en geven daarom slechts een indruk van de praktijk.</p>
              <p>Wanneer je de gegevens voor je perceel in detail invult en opslaat, zie je vanzelf het Waterlabel dat op jouw gebouw van toepassing is.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={9}>
              <h2>Hoe tellen de maatregelen?</h2>

              <h3>Dak</h3>
              <p>De dakberging en de type dakafvoer tellen mee. Het dakoppervlak dat meer dan 20 mm regenwater vasthoudt, geeft punten voor een groener label. Daarnaast telt de manier waarop het dak afwatert; in de tuin, via een gescheiden stelsel op het oppervlaktewater of direct naar de zuivering.</p>

              <h3>Tuin</h3>
              <p>Het infiltrerend oppervlak en de waterberging in de tuin tellen mee. Het oppervlak waar regen kan infiltreren is bijvoorbeeld onverharde grond, kiezels of aarde. De waterberging is bijvoorbeeld een (lege) regenton of een waterreservoir. Tenslotte geeft ook een geveltuintje een groener waterlabel.</p>

              <h3>Puntenverdeling</h3>
                <p>De kenmerken van dak en tuin geven we punten. Aan die punten kennen we een label toe van G t/m A. Al bij 10 punten krijg je een label F, daarna krijg je per 20 punten extra een hoger label.</p>
                <p>De puntenverdeling is gebaseerd op de volgende principes:</p>

              <ul className={styles.List}>
                <li><p>Dakberging, dakafvoer en ‘groen’ tuinoppervlak tellen mee in verhouding tot het aanwezige dak- en tuinoppervlak. Dus bij een kleine tuin kun je weinig punten met je tuin halen en kan je juist meer punten met je dak krijgen.</p></li>
                <li><p>Alle maatregelen bij elkaar opgeteld geven maximaal 150 punten. Je kunt label A dus op diverse manieren behalen.</p></li>
                <li><p>Maximum punten per maatregel: 60 punten voor dakberging, 90 punten voor dakafvoer, 100 punten voor een ‘groene’ tuin, 30 punten voor 600 liter tuinberging en 20 punten voor een geveltuintje.</p></li>
              </ul>

              <p>Het is de bedoeling om de maximum punten te nuanceren op basis van een kwantitatief onderzoek. Dit onderzoek is nog nodig.</p>

            </Col>
            <Col xs={12} sm={12} md={2}>
              <img style={{ width: 250, padding: 15 }} src={algemeen03}/>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <h2>Hoe kan ik gegevens voor mijn gebouw invullen?</h2>
              <p>Dit is mogelijk door op jouw gebouw te klikken en via de knop ‘Mijn Waterlabel’ jouw gegevens in te vullen en op te slaan.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <h2>Wie heeft het Waterlabel bedacht?</h2>
              <p>Het Waterlabel is bedacht door het genootschap “De Waag” en geïnitieerd door de drie gemeenten Amsterdam, Den Haag en Rotterdam.</p>
              <p>Waterschap Amstel, Gooi en Vecht heeft zich als eerste waterschap aangesloten bij de ontwikkelaars van het Waterlabel.</p>
            </Col>
            <Col md={12}>
              <img style={{ width: 200, padding: 15 }} src={algemeen07}/>
              <img style={{ width: 250, padding: 15 }} src={algemeen08}/>
              <img style={{ width: 250, padding: 15 }} src={algemeen09}/>
              <img style={{ width: 250, padding: 15 }} src={algemeen06}/>
              <img style={{ width: 250, padding: 15 }} src={algemeen10}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AboutText;
