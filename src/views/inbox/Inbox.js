import TwoColFrame from 'layouts/frame/TwoColFrame.js';
import Info from 'layouts/info/Info.js'

export default class extends React.Component{
    render(){
        let infoProps = {
            tit: 'Inbox'
        }

        return (
            <TwoColFrame>
                <Info {...infoProps}></Info>
            </TwoColFrame>
        );
    }
}
