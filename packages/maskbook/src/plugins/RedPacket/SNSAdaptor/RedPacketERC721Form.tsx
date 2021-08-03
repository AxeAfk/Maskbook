import { Box, makeStyles } from '@material-ui/core'
import { ERC721TokenSelectPanel } from '../../../web3/UI/ERC721TokenSelectPanel'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
    }
})

export function RedPacketERC721Form() {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <ERC721TokenSelectPanel />
        </Box>
    )
}
