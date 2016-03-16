import * as React from 'react'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import Form from "./form"

interface S {
  isNotFound: boolean
  users: Array<models.User>
  members: Array<models.Member>
  userName: string
}

export default class AddPage extends React.Component<{}, S> {
  constructor(props) {
    super(props)
    this.state = {
      isNotFound: false,
      users: [],
      members: [],
      userName: null,
    }
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const idCardNumber = this.refs["idCardNumber"]["value"]
    if (idCardNumber) {
      utils.DOM.loading(true)
      client.users.search(idCardNumber, (err, res) => {
        utils.DOM.loading(false)
        if (!err && res.users && res.users.length > 0) {
          this.setState({
            isNotFound: false,
            users: res.users,
            members: res.members,
            userName: null
          })
        } else {
          this.setState({
            isNotFound: true,
            users: null,
            members: null,
            userName: null
          })
        }
      })
    }
  }

  onSelect(userName: string, e: React.MouseEvent) {
    this.setState({
      isNotFound: false,
      users: this.state.users,
      members: this.state.members,
      userName: userName
    })
  }

  onClose(e: React.MouseEvent) {
    this.setState({
      isNotFound: false,
      users: this.state.users,
      members: this.state.members,
      userName: this.state.userName
    })
  }

  render() {
    let notFoundEl = null
    if (this.state.isNotFound) {
      notFoundEl = (
        <div>
          <div className="layerBg"></div>
          <div className="layerCon1 layerCon2">
          <i className="layerClose" onClick={this.onClose.bind(this)}></i>
          <div className="layer_sbbx2">此人没有党校账号，请联系管理员！</div>
          </div>
        </div>
      )
    }

    let resultsEl = null
    let formEl = null

    if (this.state.users && this.state.users.length > 0) {
      const members = this.state.members || []
      const usersEl = this.state.users.map((user: models.User) => {
        let title = "（群众）"
        members.forEach((member: models.Member) => {
          if (member.userName === user.userName) {
            title = "（党员）"
          }
        })
        return <span key={user.id}><input name="userName" type="radio" onClick={this.onSelect.bind(this, user.userName)} />{user.userName}{title}</span>
      })
      resultsEl = <div className="m2c1_cer">{usersEl}</div>

      if (this.state.userName) {
        this.state.users.forEach((user: models.User) => {
          console.log(user)
          if (user.userName === this.state.userName) {
            let member = null
            if (this.state.members && this.state.members.length > 0) {
              this.state.members.forEach((m: models.Member) => {
                if (m.userName === this.state.userName) {
                  member = m
                }
              })
            }
            formEl = <Form user={user} member={member} />
          }
        })
      }
    }

    return (
      <div className="main2">
        {notFoundEl}
        <div className="m2pos"><a className="m2pos_a" href="#">首页</a> > <a className="m2pos_a" href="#">二级栏目位置</a> > <span className="m2pos_cut">当前栏目位置</span></div>
        <div className="m2con1">
          <div className="m2c1_top">
            <strong>身份证：</strong>
            <input ref="idCardNumber" className="m2c1_int" placeholder="请输入身份证号码" name="" type="text" />
            <input value="" className="m2submit" name="" type="submit" onClick={this.onSubmit.bind(this)} />
          </div>
          {resultsEl}
        </div>
        {formEl}
      </div>
    )
  }
}
