import SettingButton from './SettingButton'
import { UserContext } from '../hooks/UserContext'
import { useContext } from 'react'

export default function EmailSetting() {
    const { user } = useContext(UserContext)
    return <SettingButton>{user.email ? 'Change' : 'Setting'}</SettingButton>
}
