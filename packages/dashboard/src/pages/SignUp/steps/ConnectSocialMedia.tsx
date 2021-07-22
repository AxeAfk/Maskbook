import {
    Body,
    ColumnContentLayout,
    Footer,
    SignUpAccountLogo,
} from '../../../components/RegisterFrame/ColumnContentLayout'
import { useNavigate } from 'react-router'
import { RoutePaths } from '../../../type'
import { Header } from '../../../components/RegisterFrame/ColumnContentHeader'
import { useDashboardI18N } from '../../../locales'
import { SetupActionCard } from '../../Setup'
import { PersonaContext } from '../../Personas/hooks/usePersonaContext'
import { upperFirst } from 'lodash-es'
import { FacebookIcon, InstagramIcon, TwitterIcon } from '@masknet/icons'
import { Button } from '@material-ui/core'
import { ButtonGroup } from '../../../components/RegisterFrame/ButtonGroup'

// icons maping
const ICON_MAPPING = [
    {
        type: 'facebook.com',
        icon: <FacebookIcon />,
    },
    {
        type: 'twitter.com',
        icon: <TwitterIcon />,
    },
    {
        type: 'instagram.com',
        icon: <InstagramIcon />,
    },
]
export const ConnectSocialMedia = () => {
    const navigate = useNavigate()
    const t = useDashboardI18N()
    const { currentPersona, connectPersona } = PersonaContext.useContainer()

    const handleConnect = (networkIdentifier: string) => {
        if (currentPersona) {
            connectPersona(currentPersona.identifier, networkIdentifier)
        }
    }

    return (
        <ColumnContentLayout>
            <Header
                title={t.create_account_connect_social_media_title()}
                subtitle={t.create_account_persona_subtitle()}
                action={{ name: t.create_account_sign_in_button(), callback: () => navigate(RoutePaths.Login) }}
            />
            <Body>
                <SignUpAccountLogo />
                <div>
                    {ICON_MAPPING.map((d) => (
                        <SetupActionCard
                            key={d.type}
                            title={t.create_account_connect_social_media({ type: upperFirst(d.type) })}
                            icon={d.icon}
                            action={{
                                type: 'primary',
                                text: t.create_account_connect_social_media_button(),
                                handler: () => handleConnect(d.type),
                            }}
                        />
                    ))}
                </div>
                <ButtonGroup>
                    <Button sx={{ width: '224px' }} variant="rounded" color="secondary" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <Button
                        sx={{ width: '224px' }}
                        variant="rounded"
                        color="primary"
                        onClick={() => navigate(RoutePaths.Personas)}>
                        Skip
                    </Button>
                </ButtonGroup>
            </Body>
            <Footer />
        </ColumnContentLayout>
    )
}

function usePersonaContext(): [any, any] {
    throw new Error('Function not implemented.')
}
