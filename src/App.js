import React, { Component } from 'react';
import './App.css';
import {getMessages, getMembers} from './data.js';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
          data:[],
          msgData: [],
          activePage: 'member'
        }
  }
  componentDidMount() {
      const data = getMembers()
       data.then((result) => {
           console.log(result)
           this.setState({
               data: result
           })
       })

      getMessages().then(res => {
          console.log(res)
          this.setState({
              msgData: res
          })
      })
     }
    getPriorityString(data) {
         function parseISOString(s) {
          const b = s.split(/\D+/);
          return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
        }

        const dDate = new Date(parseISOString(data))

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December']

        const weekday = new Array(7)
        weekday[0] = 'Sunday'
        weekday[1] = 'Monday'
        weekday[2] = 'Tuesday'
        weekday[3] = 'Wednesday'
        weekday[4] = 'Thursday'
        weekday[5] = 'Friday'
        weekday[6] = 'Saturday'

        function formatAMPM (date) {
            let hours = date.getHours()
            let minutes = date.getMinutes()
            let ampm = hours >= 12 ? 'PM' : 'AM'
            hours = hours % 12
            hours = hours || 12
            minutes = minutes < 10 ? '0' + minutes : minutes
            const strTime = hours + ':' + minutes + ' ' + ampm
            return strTime
        }

        return (weekday[dDate.getDay()] + ',' + monthNames[dDate.getMonth()] + ' ' + dDate.getDate() + ' ' + dDate.getFullYear() + ', ' + formatAMPM(dDate))
    }
  render(){
    return (
        <div>
            <nav>
                <a href='#' onClick={() => {
                    this.setState({
                        activePage: 'member'
                    })
                }}>Members</a>
                <a href='#' onClick={() => {
                    this.setState({
                        activePage: 'message'
                    })
                }}>Messages</a>
            </nav>
      <div className="main clear-fix">

          {
            this.state.activePage === 'member' ?   (
                <div className='clear-fix'>
                    <h2>All Members</h2>
                    {
                        this.state.data.map(data => (
                            <div key={data.id} className="card" title={data.email}>
                                <img src={data.avatar === null ? 'http://dummyimage.com/100x100.jpg/5fa2dd/ffffff' : data.avatar} alt=''/>
                                <h1>{data.firstName} {data.lastName}</h1>
                                <hr/>
                                <span>IP: {data.ip}</span>
                            </div>
                        ))
                    }
                </div>
                    ) : ''
          }

          {
              this.state.activePage === 'message' ?   (
                  <div className='clear-fix'>
                      <h2>All Messages</h2>
                      {
                          this.state.msgData.map(data => (
                              <div key={data.id} className={'msg-card'}>
                                  <span className={'msg-msg'}>{data.message}</span>
                                  <span className={'msg-time'}>{this.getPriorityString(data.timestamp)}</span>
                              </div>
                          ))
                      }
                  </div>
              ) : ''
          }



      </div>
        </div>
    );
  }
}

export default App;
