import * as React from 'react'
import Location from "../components/location"
import Nav from "./nav"

export default class PartyMemberPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="main2">
        <Location />
        <Nav />
        <div className="m2fm_stop">
          <span className="m2fm_ss1">姓名：</span>
          <input type="text" name="" className="m2fm_int m2fm_int6" />
          <span className="m2fm_ss1">变动时间：</span>
          <input type="text" name="" className="m2fm_int m2fm_int2" placeholder="2016-01-20" />
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input type="text" name="" className="m2fm_int m2fm_int2" placeholder="2016-01-20" />
          <input type="submit" name="" className="m2submit" value="" />
          <a href="/party-member/add" className="m2addBtn"><img src="/assets/images/m2btn.jpg" width="76" height="32" /></a>
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2">
          <table width="100%">
            <tr className="m2th">
              <td width="4%"><input className="lay-rad" name="" type="checkbox" value="" /></td>
              <td width="9%">姓名</td>
              <td width="9%">性别</td>
              <td width="16%">所属组织</td>
              <td width="13%">申请入党日期</td>
              <td width="13%">思想汇报份数</td>
              <td width="13%">手机</td>
              <td width="23%">操作</td>
            </tr>
            <tr>
              <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
              <td><span className="cor_red">丁皓</span></td>
              <td>男</td>
              <td>政企分公司</td>
              <td>2011年2月</td>
              <td>4</td>
              <td>1300989900</td>
              <td><a className="m2fm_abtn" href="#">编辑</a><a className="m2fm_abtn" href="#">转出</a><a className="m2fm_abtn" href="#">列为积极分子</a></td>
            </tr>
            <tr>
              <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
              <td><span className="cor_red">丁皓</span></td>
              <td>男</td>
              <td>政企分公司</td>
              <td>2011年2月</td>
              <td>4</td>
              <td>1300989900</td>
              <td><a className="m2fm_abtn" href="#">编辑</a><a className="m2fm_abtn" href="#">转出</a><a className="m2fm_abtn" href="#">列为积极分子</a></td>
            </tr>
            <tr>
              <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
              <td><span className="cor_red">丁皓</span></td>
              <td>男</td>
              <td>政企分公司</td>
              <td>2011年2月</td>
              <td>4</td>
              <td>1300989900</td>
              <td><a className="m2fm_abtn" href="#">编辑</a><a className="m2fm_abtn" href="#">转出</a><a className="m2fm_abtn" href="#">列为积极分子</a></td>
            </tr>
            <tr>
              <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
              <td><span className="cor_red">丁皓</span></td>
              <td>男</td>
              <td>政企分公司</td>
              <td>2011年2月</td>
              <td>4</td>
              <td>1300989900</td>
              <td><a className="m2fm_abtn" href="#">编辑</a><a className="m2fm_abtn" href="#">转出</a><a className="m2fm_abtn" href="#">列为积极分子</a></td>
            </tr>
            <tr>
              <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
              <td><span className="cor_red">丁皓</span></td>
              <td>男</td>
              <td>政企分公司</td>
              <td>2011年2月</td>
              <td>4</td>
              <td>1300989900</td>
              <td><a className="m2fm_abtn" href="#">编辑</a><a className="m2fm_abtn" href="#">转出</a><a className="m2fm_abtn" href="#">列为积极分子</a></td>
            </tr>
          </table>
          <div className="m2fm_page">
            <a href="#" className="m2fmPage_a">＜</a>
            <a href="#" className="m2fmPage_a on">1</a>
            <a href="#" className="m2fmPage_a">2</a>
            <a href="#" className="m2fmPage_a">3</a>
            <a href="#" className="m2fmPage_a">4</a>
            <a href="#" className="m2fmPage_a">5</a>
            <a href="#" className="m2fmPage_a">6</a>
            <a href="#" className="m2fmPage_a">7</a>
            <span className="m2fmPage_a2">...</span>
            <a href="#" className="m2fmPage_a">99</a>
            <a href="#" className="m2fmPage_a">100</a>
            <a href="#" className="m2fmPage_a">＞</a>
          </div>
        </div>
      </div>
    )
  }
}
