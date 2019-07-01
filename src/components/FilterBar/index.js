/**
 * 下拉过滤框组件
 * data: ["cc", "dd", "cd"]
 */
import React, { Component } from "react";
import "./style.css";

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      selectIndex: 0
    };
  }

  handleClick(item, index) {
    this.setState({
      selectIndex: index,
      hide: true
    });
    if(this.props.handleClick){
      this.props.handleClick(item, index);
    }
  }
  openMenuView = () => {
    console.log(this.state.hide);
    this.setState({ hide: !this.state.hide });
  };
  render() {
    let this__ = this;
    const { data } = this.props;
    const { selectIndex } = this.state;
    const optionsStyle = this.state.hide ? "filterBar__filterContainer__optionsWrap--hide" : "";
    return (
      <div className="filterBar">
        <div className="filterBar__filterContainer">
          <div className="filterBar__filterContainer__bar" onClick={this.openMenuView}>
            <span className="filterBar__filterContainer__bar__selectText">{data[selectIndex]}</span>
            <div className="filterBar__filterContainer__bar__arrowWrap">
              <span className="filterBar__filterContainer__bar__arrow" />
            </div>
          </div>
          <div className={`filterBar__filterContainer__optionsWrap ${optionsStyle}`}>
            <span className="filterBar__filterContainer__optionsWrap__arrow" />
            <div className="filterBar__filterContainer__optionsWrap__options">
              {data.map((item, index) => {
                let selectStyle =
                  selectIndex === index ? "filterBar__filterContainer__optionsWrap__option--select" : null;
                return (
                  <div
                    key={index}
                    className={`filterBar__filterContainer__optionsWrap__option ${selectStyle}`}
                    onClick={this__.handleClick.bind(this__, item, index)}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterBar;
