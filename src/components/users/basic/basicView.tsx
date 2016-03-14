import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  member: models.Member
}

export default class BasicView extends React.Component<P, {}> {
  render() {
    const member = this.props.member

    return (
      <div className="mper_fm">
        <div className="mper_stop">
          <span className="fl">基础资料表单</span>
          <span className="fr">当前组织机构 : XXXXX党支部</span>
        </div>
        <div className="m2upLaod">
          <div className="m2pImg"><img src="/assets/images/headImg.jpg" width="120" height="120" /></div>
          <div className="m2pTxt">
            <a href="#" className="m2Btn"></a>
            支持为jpg、精品个、gif、png格式，大小在2M以内的图片上传
          </div>
        </div>
        <div className="m2fm">
          <ul>
            <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 登录名：</span>Qertweee123</li>
            <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 密  码：</span>***********</li>
            <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 姓  名：</span>张三</li>
            <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 性  别：</span>男
              <div className="m2fm_selBox">
                <dl>
                  <dd>男</dd>
                  <dd>女</dd>
                </dl>
              </div></li>
            <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 身份证号：</span>01023688766666</li>
            <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 出生年月：</span>1980-03-04</li>
            <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 民  族：</span>汉族</li>
            <li><span className="m2fm_s1"> 职  务：</span>XXXXXX</li>
            <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 学  历：</span>大本</li>
            <li><span className="m2fm_s1"> 学  位：</span>XXXXXX</li>
            <li><span className="m2fm_s1"> 联系电话：</span>1303459999</li>
            <li><span className="m2fm_s1"> 手机号码：</span>1303459999</li>
            <li><span className="m2fm_s1"> 邮  箱：</span>XXXX@163.com</li>
            <li><span className="m2fm_s1"> 申请入党日期：</span>2015-03-04</li>
          </ul>
          <div className="clear"></div>
        </div>
        <div className="m2fm m2fm2">
          <ul>
            <li><span className="m2fm_s1"> 籍  贯：</span>北京</li>
            <li><span className="m2fm_s1"><strong className="cor_red">*</strong> 工作岗位：：</span>技术</li>
            <li><span className="m2fm_s1">参加工作日期：</span>2001-03-02</li>
            <li><span className="m2fm_s1">专业技术职务：</span>XXXXXX</li>
            <li><span className="m2fm_s1">工作岗位开始日期：</span>2001-03-02</li>
          </ul>
          <div className="clear"></div>
        </div>
        <div className="m2per_btnBox">
          <a className="m2per_abtn" href="javascript:;">修 改</a>
          <a className="m2per_abtn2" href="javascript:;">提 交</a>
        </div>
      </div>
    )
  }
}
