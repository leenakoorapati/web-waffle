
import React, { Component } from 'react';
import filter from 'lodash/filter';
import { sum, map } from 'lodash';
import sortedData from '../helpers/sortedData';
import renderNoImage from '../helpers/renderNoImage';
import renderRevenueChart from '../helpers/renderRevenueChart';
import './styles.scss';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuContainerOpened: false,
      selectedItem: '',
      sortDirection: false,
      imageStatus: '',
    }
  }



  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  handleErrorImage() {
    this.setState({ imageStatus: 'error' });
  }

  render() {
    const { menuContainerOpened, selectedItem, sortDirection } = this.state;
    const logs = require('../helpers/logs.json');
    let users = require('../helpers/users.json');
    const menuItems = ['Name', 'Occupation', 'Revenue', 'Conversion', 'Impression'];

    return (
      <div>
        <div className="sort-profile-container"><h2>User Catalog<span className="selected-sort-item">{selectedItem}</span></h2> <span
          className="sort-container"
        >
          <div
            role="button"
            onClick={() => this.setState({ sortDirection: !sortDirection })}
            style={{ paddingRight: '15px' }}
          >
            {!sortDirection ? <i class="fa fa-arrow-down"></i> : <i class="fa fa-arrow-up"></i>}
          </div>
          <div
            role="button"
            onClick={() => this.setState({ menuContainerOpened: !menuContainerOpened })}
          >  <i className="fa fa-bars"></i></div>
          {menuContainerOpened ?
            <div className="sort-menu-container">{map(menuItems, i =>
              <span
                onClick={() => this.setState({ selectedItem: i, menuContainerOpened: false })}
              >{i}</span>)}</div>
            : null}
        </span>
        </div>
        <div className="user-container">
          {(selectedItem.length > 0 ? sortedData(users, selectedItem, sortDirection) : users).map((i, index) => {
            const filteredData = filter(logs, j => j.user_id === i.id);
            const filteredConversionData = filter(filteredData, k => k.type === 'conversion');
            const filteredImpressionData = filter(filteredData, l => l.type === 'impression');
            const conversionRevenue = sum(
              map(filteredConversionData, k => k.revenue || 0),
            );
            const impressionRevenue = sum(
              map(filteredImpressionData, l => l.revenue || 0),
            );
            const totalRevenue = sum(
              map(filteredData, m => m.revenue || 0),
            );
            const newItem = i;
            newItem.conversionRevenue = conversionRevenue;
            newItem.impressionRevenue = impressionRevenue;
            newItem.totalRevenue = totalRevenue;
            const imagePresent = document.getElementById('s3-image') && document.getElementById('s3-image').complete;

            return (
              <div key={index} className="profile-container">
                <div className="profile-item-container">
                  <div className="image-container">

                    {i.avatar.length === 0 ? <div className="no-avatar-container">{i.name.charAt(0)}</div>
                      : (
                        <img
                          id="s3-image"
                          src={i.avatar}
                          style={{
                            borderRadius: '65px',
                            height: '90px'
                          }}
                          // onError={this.handleErrorImage(true)}
                          // onError={renderNoImage(i.name, true, (v) => this.setState(v))}
                          alt={i.name.charAt(0)}
                        />
                      )
                    }
                    <div className="name-occupation-container">
                      <h2>{i.name}</h2>
                      <span className="text-grey">{i.occupation}</span>
                    </div>
                  </div>
                  <div className="graph-cost-container">
                    <div className="graph-container">
                      <div>
                        {renderRevenueChart(filteredConversionData)}
                      </div>
                    </div>
                    <div className="cost-values-container">
                      <div>
                        <h4 className="impression-count">{this.numberWithCommas(impressionRevenue.toFixed(2))}</h4>
                        <span className="sub-text-grey">impressions</span>
                      </div>
                      <div>
                        <h4 className="conversion-count">{this.numberWithCommas(conversionRevenue.toFixed(2))}</h4>
                        <span className="sub-text-grey">conversions</span>
                      </div>
                      <div>
                        <h3 className="total-revenue-count">{`$${this.numberWithCommas(totalRevenue.toFixed(2))}`}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
          }
          )}
        </div>
      </div>
    );
  }
}

export default (Profile);






