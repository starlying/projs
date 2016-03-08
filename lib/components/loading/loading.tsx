import * as React from 'react'
import * as lang from '../../lang'
import * as utils from '../../utils'
//import '../../../less/components/loading.less'

export default class Loading extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div id="g3w-loading" className='g3w-loading'>
          <div className='loading-animation'>
            <div className='loading-text'>{lang.get('Working...')}</div>
            <img src={utils.Addr.getImgUrl('loading_animation.gif')} />
          </div>
          <div className='loading-mask'></div>
        </div>
        <div id="g3w-windows-mask" className='g3w-windows-mask'></div>
      </div>
    )
  }
}
