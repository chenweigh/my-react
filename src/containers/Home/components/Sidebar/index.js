import React, { Component } from "react";
import "./style.css";

import { IMG_HAT } from "../../../../utils/images";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {}

  //分类点击事件
  handleClick(e, index, tab) {
    e.stopPropagation();
    console.log("slider:", index);
    if(this.props.handleClickTab){
      this.props.handleClickTab(index, tab.path, 0);
    }
  }
  //分类下子分类点击事件
  handleSubClick(e, subIndex, subTab) {
    e.stopPropagation();
    console.log("slider(sub):", subIndex);
    if(this.props.handleClickTab){
      this.props.handleClickTab(subIndex, subTab.path, 1);
    }
  }
  jumpOnePage(index){
    switch (index) {
      case 0:
        //课程管理
        this.props.history.push("courselist")
        break;
      case 1:
        //教室管理
        break
      default:
        break;
    }
  }
  jumpTwoPage(){

  }
  render() {
    var that = this;
    const { tabs, selectTab, selectSubTab } = this.props;
    return (
      <div className="sidebar">
        <ul className="sidebar__tabs">
          <div className="sidebar__outLine" />
          {tabs.map((item, index) => {
            let isCurrentTab = index === selectTab;
            let arrowStyle = isCurrentTab
              ? "sidebar__tab__arrowUp"
              : "sidebar__tab__arrowDown";
            let subTabsStyle = isCurrentTab
              ? "sidebar__subTabWrapper"
              : "sidebar__subTabWrapper sidebar__subTabWrapper--none";
            return (
              <li
                key={index}
                className="sidebar__tabContainer"
                onClick={e => {
                  that.handleClick(e, index, item.title);
                }}
              >
                {isCurrentTab ? <div className="sidebar__innerLine" /> : null}
                <div className="sidebar__tab">
                  <img className="sidebar__tab__icon" src={IMG_HAT} alt="" />
                  <span>{item.title.text}</span>
                  {item.subTitle.length > 0 ? (
                    <span className={arrowStyle} />
                  ) : null}
                </div>
                <ul className={subTabsStyle}>
                  {item.subTitle.map((subtab, subIndex) => {
                    let selectStyle =
                      subIndex === selectSubTab && index === selectTab
                        ? "sidebar__subTab sidebar__subTab--puple"
                        : "sidebar__subTab";
                    return (
                      <li
                        key={subIndex}
                        className={selectStyle}
                        onClick={e => {
                          that.handleSubClick(e, subIndex, subtab);
                        }}
                      >
                        {subtab.text}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
