import { memo } from 'react'
import type { BackupFileInfo } from '../../pages/Settings/type'
import { Box, Card, Grid, Stack, Typography } from '@material-ui/core'

interface BackupInfoProps {
    info: BackupFileInfo
}

export const BackupInfo = memo(({ info }: BackupInfoProps) => {
    return (
        <Card variant="background">
            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ padding: '8px' }}>
                <Grid item xs={10}>
                    <Stack spacing={1}>
                        <Typography variant="body2">{info.abstract}</Typography>
                        <Typography variant="body2">{info.uploadedAt}</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={2}>
                    <Box>
                        <Typography align="right" variant="body2">
                            {info.size}K
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
})
