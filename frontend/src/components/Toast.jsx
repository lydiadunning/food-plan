import * as Toast from '@radix-ui/react-toast';
import { Card } from '@radix-ui/themes';

const MessageToast = ({message}) => {
  
  return (
    <Toast.Provider>
      <Toast.Root open={message}>
        <Card>
          <Toast.Description>
            {message}
          </Toast.Description>
        </Card>
        
      </Toast.Root>

      <Toast.Viewport style={{listStyle: 'none', width: 'fit-content', position: 'absolute', right: '0'}}/>
    </Toast.Provider>
  )
}
  
export default MessageToast