import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Table from 'react-bootstrap/Table';
import './App.css';

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            data: [],
            filteredData: [],
            query: "",
            global: {},
        }

    }

    isChange = (event) => {
      const query = event.target.value;

      this.setState(prevState => {
        const filteredData = prevState.data.filter(element => {
          return element.Country.toLowerCase().includes(query.toLowerCase());
        });
  
        return {
          query,
          filteredData
        };
      });
    }

    async componentDidMount() {
      await axios.get('https://api.covid19api.com/summary')
      .then((res) => {
        const data = res.data.Countries
        const global = res.data.Global
        const { query } = this.state;
        const filteredData = data.filter(element => {
          return element.Country.toLowerCase().includes(query.toLowerCase());
        });
        this.setState({ data, global, filteredData})
        
      })
      
    }

    render() {
        const { global,filteredData} = this.state
        
        return (
            
                <div className="container">
                    <div className="text-center">
                        <h1 style={{marginTop: 50}}>COVID-19 Statistics</h1>

                          <div className="form-group">
                              <div >
                                  <input value = {this.state.query} onChange={this.isChange} type="text" className="form-control" placeholder="Search" />                   
                              </div>
                            
                          </div>  
                        <Table striped bordered hover responsive="xl" >
                          <thead>
                            <tr>
                              <th>Country</th>
                              <th>Total Cases</th>
                              <th>New Cases</th>
                              <th>Total Deaths</th>
                              <th>New Deaths</th>
                              <th>Total Recovered</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Global</td>
                              <td>{global.TotalConfirmed}</td>
                              <td>{'+' + global.NewConfirmed}</td>
                              <td>{global.TotalDeaths}</td>
                              <td>{'+' + global.NewDeaths}</td>
                              <td>{global.TotalRecovered}</td>
                            </tr>

                            {filteredData.map((item,key) => {
                              
                              return <tr key = {key}>
                                      <td>{item.Country}</td>
                                      <td>{item.TotalConfirmed}</td>
                                      <td>{'+' + item.NewConfirmed}</td>
                                      <td>{item.TotalDeaths}</td>
                                      <td>{'+' + item.NewDeaths}</td>
                                      <td>{item.TotalRecovered}</td>
                            </tr>
                          
                            })}
                          </tbody>
                        </Table>
                    </div>
                    <hr />
                </div>
            
        )
    }
}

export default App