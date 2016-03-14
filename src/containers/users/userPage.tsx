import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as actions from '../../actions/authActions';
import * as links from '../../constants/links'
import BasicView from '../../components/users/basic/basicView'
import BasicEdit from '../../components/users/basic/basicEdit'

interface P {
  actions?: any,
  authState?: states.AuthState,
  params: {
    userName: string
  }
}

interface S {
  isError: boolean
  isSelf: boolean
  member: models.Member
}

class UserPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      isSelf: props.authState.member.userName === props.params.userName,
      member: null,
    }
  }

  componentDidMount() {
    if (this.state.isSelf) {
      this.setState({
        isError: false,
        isSelf: true,
        member: this.props.authState.member
      })
    } else {
      client.members.get(this.props.params.userName, (err: models.Error, res: models.Member) => {
        if (!err && res) {
          this.setState({
            isError: false,
            isSelf: false,
            member: res
          })
        } else {
          this.setState({
            isError: true,
            isSelf: false,
            member: null
          })
        }
      })
    }
  }

  onClose(e: React.MouseEvent) {
    this.setState({
      isError: false,
      isSelf: this.state.isSelf,
      member: this.state.member
    })
  }

  render() {
    if (!this.state.member) return <InnerLoading />

    let errorEl = null
    if (this.state.isError) {
      errorEl = (
        <div>
          <div className="layerBg">
          </div>
          <div className="layerCon1 layerCon2">
            <i className="layerClose" onClick={this.onClose.bind(this) }></i>
            <div className="layer_sbbx2">此人没有党校账号，请联系管理员！</div>
          </div>
        </div>
      )
    }

    let basicEl = null
    if (this.state.isSelf) {
      basicEl = <BasicEdit member={this.state.member} />
    } else {
      basicEl = <BasicView member={this.state.member} />
    }

    return (
      <div className="main2_per">
        {errorEl}
        <div className="m2pos"><a className="m2pos_a" href="#">首页</a> > <a className="m2pos_a" href="#">二级栏目位置</a> > <span className="m2pos_cut">当前栏目位置</span>
        </div>
        <div className="mperCon">
          <div className="mperL">
            <a href="#" className="mper_back"></a>
            <div className="mper_nav">
              <div className="mper_head">
                <img src="/assets/images/per_head.jpg" width="122" height="122" />
                <p>
                  姓名：杜丽梅<br />
                  身份：党员<br />
                  党龄：3年
                </p>
              </div>
              <div className="mper_t1">基础资料</div>
              <div className="mper_nul">
                <ul>
                  <li><a href="#" className="mper_a2">基本信息</a>
                  </li>
                  <li><a href="#" className="mper_a2">详细资料</a>
                  </li>
                  <li><a href="#" className="mper_a2">修改头像</a>
                  </li>
                  <li><a href="#" className="mper_a2">党籍信息</a>
                  </li>
                  <li><a href="#" className="mper_a2">教育经历</a>
                  </li>
                  <li><a href="#" className="mper_a2">工作经历</a>
                  </li>
                </ul>
              </div>
              <div className="mper_t1">档案资料</div>
              <div className="mper_nul">
                <ul>
                  <li><a href="#" className="mper_a2">思想汇报</a>
                  </li>
                  <li><a href="#" className="mper_a2">支部大会决议</a>
                  </li>
                  <li><a href="#" className="mper_a2">档案信息</a>
                  </li>
                  <li><a href="#" className="mper_a2">发展履历</a>
                  </li>
                </ul>
              </div>
              <div className="mper_t1">日常操作</div>
              <div className="mper_nul">
                <ul>
                  <li><a href="#" className="mper_a2">党费缴纳</a>
                  </li>
                  <li><a href="#" className="mper_a2">组织关系转接</a>
                  </li>
                  <li><a href="#" className="mper_a2">密码修改</a>
                  </li>
                </ul>
              </div>
            </div>
            {basicEl}
            <div className="clear">
            </div>
          </div>
          <div className="mperMenu">
            <dl>
              <dt>申请人</dt>
              <dd><a href="#" className="mper_a1">提交思想汇报</a></dd>
              <dd><a href="#" className="mper_a1">关联会议</a></dd>
              <dd><a href="#" className="mper_a1">列为积极分子</a></dd>
              <dd><a href="#" className="mper_a1">转出</a></dd>
            </dl>
          </div>
          <div className="clear">
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: states.AllState) {
  return {
    authState: state.authState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
