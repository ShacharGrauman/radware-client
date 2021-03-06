import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { searchSignature, copySignature } from '../../../api/controllers/reports';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';
import { ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faCopy } from "@fortawesome/free-solid-svg-icons";
import Table from "../../shared/Table";
import SeverityRange from "./SeverityRange";
import AttackTypeSelection from "./AttackTypeSelection";
import AttackStatusSelection from "./AttackStatusSelection";
import VulnerabilityDefinition from "./VulnerabilityDefinition";
import ScanAtCheckBoxes from "./ScanAtCheckBoxes";
import RefrencesSelection from "./RefrencesSelection";

class SearchSignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasNext: true,
      hasPrev: false,
      page: 1,
      tableData: [{ patternID: "", description: "", status: '' }],
      isRefined: false,
      errorMsg: ''
    }
    this.urlDetails = {
      page: 1,
      size: 20,
    }
    this.data = {
      slider: 2
    }
    this.switchers = [];
    this.sortArrByKey = this.sortArrByKey.bind(this);
    this.stam = [];
  }

  copySignature = async (id) => {
    const { data } = await copySignature(id);
    this.props.history.push(`/createOrEditSignature/${data.id}`)
  }

  addingButtonsToTable = () => {
    const tableData = this.state.tableData;
    if (tableData.length != 0) {
      tableData.map(signatur => {
        const id = signatur.Id
        signatur['Edit/Copy'] =
          <div>
            <Link to={`/createOrEditSignature/${id}`}>
              <FontAwesomeIcon
                className="fa-lg float-left"
                icon={faEdit}
                style={{ color: 'blue', cursor: 'pointer' }}
              ></FontAwesomeIcon>
            </Link>
            <FontAwesomeIcon
              onClick={() => {
                this.copySignature(id)
              }}
              className="fa-lg float-right"
              icon={faCopy}
              style={{ color: 'red', cursor: 'pointer' }}>
            </FontAwesomeIcon>
          </div>
      })
      tableData.forEach(sig => {
        delete sig.Id
      })
      this.setState({ tableData: tableData })
    }
  }
  onSearch = async e => {
    let requestURL = '';
    Object.keys(this.urlDetails).forEach(key => {
      if (Array.isArray(this.urlDetails[key])) {
        this.urlDetails[key].forEach(value =>
          requestURL = requestURL.concat(`&${key}=${value}`)
        )
      } else {
        requestURL = requestURL.concat(`&${key}=${this.urlDetails[key]}`)
      }
    })
    requestURL = '/signature/search?'.concat(requestURL.slice(1))
    try {
      const data = await searchSignature(requestURL);
      let newData = data.map(sig => (
        {
          Id: sig.id,
          patternID: sig.pattern_id,
          Description: sig.description,
          Status: sig.status
        }
      ));
      if (newData.length == 0) {
        newData = [{ patternID: "NO RESULTS FOUND !", description: "NO RESULTS FOUND !", status: 'NO RESULTS FOUND !' }]
        this.setState({ tableData: newData, errorMsg: '', role: data.role });
      } else {
        this.setState({ tableData: newData, errorMsg: '', role: data.role });
        this.addingButtonsToTable();
      }
    } catch (error) {
      this.setState({
        errorMsg: 'Inalid email or password'
      });
    }
  }


  sortArrByKey(arr, key) {
    if (!(key == '')) {
      if (!(this.urlDetails['sortby'] == key)) {
        this.urlDetails['sortby'] = key;
        this.urlDetails['orderby'] = 'asc'
      } else {
        const orderby = this.urlDetails['orderby']
        this.urlDetails['orderby'] = orderby == 'asc' ? 'desc' : 'asc'
      }
      this.onSearch()
    }
  }

  update = val => {
    this.data.slider = val;
  };

  addSwitcher = switcher => {
    this.switchers.push(switcher);
  }
  switchAll = () => {
    this.switchers.forEach(switcher => switcher());
  }

  urlUpdate = (key, value) => {
    if (value == "") {
      delete this.urlDetails[key]
    }
    else {
      this.urlDetails[key] = value;
    }
  }

  onSelect = (key, value) => {
    this.urlUpdate(key, value);
  }
  onEnter = e => {
    if (e.key == 'Enter') {
      this.onSearch()
    }
  }

  render() {

    return (
      <div className="container-fluid" onKeyPress={this.onEnter}>
        <h1 className="mx-md-3 mt-2 mx-lg-5" style={{ fontFamily: "cursive", fontSize: "30px" }}>Search Signatures</h1>
        <form>
          <div className="row mt-3 mx-auto">
            <div className="col-12 col-sm-6 col-md-5 col-lg-3 mx-md-3 mx-lg-5">
              <div className="form-group has-search">
                <InputGroup>
                  <input
                    id="searchBox"
                    type="text"
                    className="form-control form-rounded"
                    placeholder="Search"
                    onChange={e => this.urlUpdate('description', e.target.value)}
                  />
                  <ButtonToolbar>
                    <OverlayTrigger
                      key={'top'}
                      placement={'top'}
                      overlay={
                        <Tooltip id={`tooltip-${'top'}`}>
                          You can search by pressing ENTER
                         </Tooltip>
                      }
                    >
                      <InputGroupAddon addonType="append" style={{ cursor: 'pointer' }}>
                        <InputGroupText>
                          <FontAwesomeIcon icon={faSearch} onClick={this.onSearch} />
                        </InputGroupText>
                      </InputGroupAddon>
                    </OverlayTrigger>
                  </ButtonToolbar>
                </InputGroup>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-5 col-lg-3 mx-md-3 mx-lg-5">
              <Button color="secondary" id="toggler" style={{ marginBottom: '1rem' }} onClick={this.switchAll}>
                Refine your search
          </Button>
            </div>
          </div>
          <div>
            <UncontrolledCollapse toggler="#toggler">
              <Card>
                <CardBody>
                  <div className="row mx-auto py-2">
                    <div className="col-12 col-sm-6 col-md-5 col-lg-3 mx-md-3 mx-lg-5">
                      <AttackTypeSelection connectTo={this.addSwitcher} onSelect={this.urlUpdate} />
                      <div className="py-3">
                        <SeverityRange slidingRangeV={this.update} connectTo={this.addSwitcher} onSelect={this.urlUpdate} />
                      </div >
                      <AttackStatusSelection connectTo={this.addSwitcher} onSelect={this.urlUpdate} />
                    </div>
                    <div className="col-12 col-sm-6 col-md-5 col-lg-3 mx-md-3 mx-lg-5">
                      <span className="row">
                        <span className="col-12">
                          <VulnerabilityDefinition connectTo={this.addSwitcher} onSelect={this.urlUpdate} />
                        </span>
                      </span>
                      <div className="py-3">
                        <ScanAtCheckBoxes connectTo={this.addSwitcher} onSelect={this.urlUpdate} />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-5 col-lg-3 mx-md-3 mx-lg-5">
                      <RefrencesSelection connectTo={this.addSwitcher} onSelect={this.urlUpdate} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>
        </form>
        <div className="row mx-auto">
          <div className="col-sm-12 col-md-11 mx-sm-1 mx-md-3 mx-lg-5 py-4">
            <Table data={this.state.tableData} sortDataByKey={this.sortArrByKey} />
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(SearchSignature);