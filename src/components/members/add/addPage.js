"use strict";
const React = require('react');
const utils = require('../../../lib/utils');
const client_1 = require('../../../lib/client');
const form_1 = require("./form");
class AddPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNotFound: false,
            users: [],
            members: [],
            userName: null,
        };
    }
    onSubmit(e) {
        utils.DOM.prevent(e);
        const idCardNumber = this.refs["idCardNumber"]["value"];
        if (idCardNumber) {
            utils.DOM.loading(true);
            client_1.default.users.search(idCardNumber, (err, res) => {
                utils.DOM.loading(false);
                if (!err && res.users && res.users.length > 0) {
                    this.setState({
                        isNotFound: false,
                        users: res.users,
                        members: res.members,
                        userName: null
                    });
                }
                else {
                    this.setState({
                        isNotFound: true,
                        users: null,
                        members: null,
                        userName: null
                    });
                }
            });
        }
    }
    onSelect(userName, e) {
        this.setState({
            isNotFound: false,
            users: this.state.users,
            members: this.state.members,
            userName: userName
        });
    }
    onClose(e) {
        this.setState({
            isNotFound: false,
            users: this.state.users,
            members: this.state.members,
            userName: this.state.userName
        });
    }
    render() {
        let notFoundEl = null;
        if (this.state.isNotFound) {
            notFoundEl = (React.createElement("div", null, 
                React.createElement("div", {className: "layerBg"}), 
                React.createElement("div", {className: "layerCon1 layerCon2"}, 
                    React.createElement("i", {className: "layerClose", onClick: this.onClose.bind(this)}), 
                    React.createElement("div", {className: "layer_sbbx2"}, "此人没有党校账号，请联系管理员！"))));
        }
        let resultsEl = null;
        let formEl = null;
        if (this.state.users && this.state.users.length > 0) {
            const members = this.state.members || [];
            const usersEl = this.state.users.map((user) => {
                let title = "（群众）";
                members.forEach((member) => {
                    if (member.userName === user.userName) {
                        title = "（党员）";
                    }
                });
                return React.createElement("span", {key: user.id}, 
                    React.createElement("input", {name: "userName", type: "radio", onClick: this.onSelect.bind(this, user.userName)}), 
                    user.userName, 
                    title);
            });
            resultsEl = React.createElement("div", {className: "m2c1_cer"}, usersEl);
            if (this.state.userName) {
                this.state.users.forEach((user) => {
                    if (user.userName === this.state.userName) {
                        let member = null;
                        if (this.state.members && this.state.members.length > 0) {
                            this.state.members.forEach((m) => {
                                if (m.userName === this.state.userName) {
                                    member = m;
                                }
                            });
                        }
                        formEl = React.createElement(form_1.default, {user: user, member: member});
                    }
                });
            }
        }
        return (React.createElement("div", {className: "main2"}, 
            notFoundEl, 
            React.createElement("div", {className: "m2pos"}, 
                React.createElement("a", {className: "m2pos_a", href: "#"}, "首页"), 
                " > ", 
                React.createElement("a", {className: "m2pos_a", href: "#"}, "二级栏目位置"), 
                " > ", 
                React.createElement("span", {className: "m2pos_cut"}, "当前栏目位置")), 
            React.createElement("div", {className: "m2con1"}, 
                React.createElement("div", {className: "m2c1_top"}, 
                    React.createElement("strong", null, "身份证："), 
                    React.createElement("input", {ref: "idCardNumber", className: "m2c1_int", placeholder: "请输入身份证号码", name: "", type: "text"}), 
                    React.createElement("input", {value: "", className: "m2submit", name: "", type: "submit", onClick: this.onSubmit.bind(this)})), 
                resultsEl), 
            formEl));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddPage;
//# sourceMappingURL=addPage.js.map