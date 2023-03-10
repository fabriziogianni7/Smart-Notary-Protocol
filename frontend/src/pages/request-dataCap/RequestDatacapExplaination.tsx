// ** MUI Imports
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import FormLayoutsIconsRequestDataCap from 'src/views/form-layouts/FormLayoutsIconsRequestDataCap'
import TextPanel from 'src/@core/components/text-panel/textPanel'
import { textsRequestDataCap } from 'src/constants/consts'


const RequestDatacapExplaination = () => {
  return (
    <Card>
      <CardHeader title='Request DataCap' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <TextPanel title='Policy' texts={textsRequestDataCap} indexRoute={2} route={'/rules'} />
      </CardContent>
      <CardContent>
        <FormLayoutsIconsRequestDataCap />
      </CardContent>
    </Card>
  )
}

export default RequestDatacapExplaination
