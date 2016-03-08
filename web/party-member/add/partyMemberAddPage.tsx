import * as React from 'react'
import Location from "../../components/location"
import Nav from "../nav"

export default class PartyMemberAddPage extends React.Component<{}, {}> {
  render() {
    const notFoundEl = (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1 layerCon2">
        <i className="layerClose"></i>
        <div className="layer_sbbx2">此人没有党校账号，请联系管理员！</div>
        </div>
      </div>
    )

    return (
      <div className="main2">
        {notFoundEl}
        <div className="m2pos"><a className="m2pos_a" href="#">首页</a> > <a className="m2pos_a" href="#">二级栏目位置</a> > <span className="m2pos_cut">当前栏目位置</span></div>
        <div className="m2con1">
          <div className="m2c1_top">
            <strong>身份证：</strong>
            <input className="m2c1_int" placeholder="请输入身份证号码" name="" type="text" />
            <input value="" className="m2submit" name="" type="submit" />
          </div>
          <div className="m2c1_cer">
            <input name="" type="radio" value="" />张三（群众）
            <input name="" type="radio" value="" />李斯（党员）
            <input name="" type="radio" value="" />王五（群众）
          </div>
        </div>
        <div className="m2con2">
          <div className="m2c2_t">基础资料表单</div>
          <div className="m2upLaod">
            <div className="m2pImg"><img src="/assets/images/headImg.jpg" width="120" height="120" /></div>
            <div className="m2pTxt">
              <a href="#" className="m2Btn"></a>
              支持为jpg、精品个、gif、png格式，大小在2M以内的图片上传
            </div>
          </div>
          <div className="m2fm">
            <ul>
              <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 登录名：</span><input className="m2fm_int" name="" type="text" /></li>
              <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 密  码：</span><input className="m2fm_int" name="" type="text" /></li>
              <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 姓  名：</span><input className="m2fm_int" name="" type="text" /></li>
              <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 性  别：</span><input placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
                <div className="m2fm_selBox">
                  <dl>
                    <dd>男</dd>
                    <dd>女</dd>
                  </dl>
                </div></li>
              <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 身份证号：</span><input className="m2fm_int" name="" type="text" /></li>
              <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 出生年月：</span><input placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" type="text" /></li>
              <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 民  族：</span><input placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
                <div className="m2fm_selBox">
                  <dl>
                    <dd>汉</dd>
                    <dd>维吾尔</dd>
                  </dl>
                </div>
              </li>
              <li><span className="m2fm_s1"> 职  务：</span><input className="m2fm_int" name="" type="text" /></li>
              <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 学  历：</span><input placeholder="大专" className="m2fm_int m2fm_int3" type="text" />
                <div className="m2fm_selBox">
                  <dl>
                    <dd>大专</dd>
                    <dd>本科</dd>
                  </dl>
                </div></li>
              <li><span className="m2fm_s1"> 学  位：</span><input placeholder="博士" className="m2fm_int m2fm_int3" type="text" />
                <div className="m2fm_selBox">
                  <dl>
                    <dd>博士</dd>
                    <dd>博士</dd>
                  </dl>
                </div></li>
              <li><span className="m2fm_s1"> 联系电话：</span><input className="m2fm_int" name="" type="text" /></li>
              <li><span className="m2fm_s1"> 手机号码：</span><input className="m2fm_int" name="" type="text" /></li>
              <li><span className="m2fm_s1"> 邮  箱：</span><input className="m2fm_int" name="" type="text" /></li>
              <li><span className="m2fm_s1"> 申请入党日期：</span><input placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" type="text" /></li>
            </ul>
            <div className="clear"></div>
          </div>
          <div className="m2fm m2fm2">
            <ul>
              <li><span className="m2fm_s1"> 籍  贯：</span><input placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
                <div className="m2fm_selBox">
                  <dl>
                    <dd>汉</dd>
                    <dd>维吾尔</dd>
                  </dl>
                </div>
              </li>
              <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 工作岗位：：</span><input placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
                <div className="m2fm_selBox">
                  <dl>
                    <dd>汉</dd>
                    <dd>维吾尔</dd>
                  </dl>
                </div>
              </li>
              <li><span className="m2fm_s1">参加工作日期：</span><input placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" type="text" /></li>
              <li><span className="m2fm_s1">专业技术职务：</span><input className="m2fm_int" name="" type="text" /></li>
              <li><span className="m2fm_s1">工作岗位开始日期：</span><input placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" type="text" /></li>
            </ul>
            <div className="clear"></div>
          </div>
          <div className="m2fmSubmitBox"><input className="m2fmSubmit" name="" type="reset" value="" /></div>
        </div>
      </div>
    )
  }
}
