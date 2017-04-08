/*=== import the common packages ===*/
import React, {Component} from 'react';
import {Grid, Col, Row, Image} from 'react-bootstrap';


import './styles.scss'; 

export default class ImageNotFound extends Component {

  // render: this is function to render all element of register page into dom
  render() {
    return (
        <Grid>
          <Row>
            <Col xs={6} md={4}>
              <Image src="/assets/thumbnail.png" rounded />
            </Col>
          </Row>
        </Grid>
    )
  }
}


