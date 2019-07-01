import React, { Component } from "react";
import "./style.css";
class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    //分类点击事件
    handleClick(item, selectIndex){
        if(this.props.handleClick){
            this.props.handleClick(item, selectIndex);
        }
    }
    //退出登录
    handleQuit = ()=>{
        this.props.quit()
    }
    render() {
        var that = this;
        const {categorys, selectCategory} = this.props;
        return (
            <div className="header">
                <span className="header__logo">cxy 学管系统</span>
                <ul className="header__categorys">
                    {categorys.map((category, index) => {
                        const select = index === selectCategory ? "header__category--puple" : "";
                        return <li key={index} className={`header__category ${select}`} onClick={that.handleClick.bind(that, category, index)}>{category.name}</li>;
                    })}
                </ul>
                <div className="header__rightContainer">
                    <span className="header__toDos">待办事项</span>
                    <em className="header__line"> | </em>
                    <div className="header__infoWrapper">
                        <button className="header__quit" onClick={this.handleQuit}>退出</button>
                        <span className="header__nickname">啦啦啦啦</span>
                        <img className="header__avatar" src="https://static1.bcjiaoyu.com/5a7ede147308f194ed9b108f98589a07_v.jpg-1080x1920" alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
