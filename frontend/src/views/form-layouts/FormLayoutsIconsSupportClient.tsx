// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import AllPurposeTable from '../tables/AllPurposeTable'

// ** Icons Imports
import SignatureFreehand from 'mdi-material-ui/SignatureFreehand'
import { useContext, useEffect, useState } from 'react'
import { Web3Context } from 'src/@core/context/web3Context'
import {  StepLabel } from '@mui/material'
import { ethers } from 'ethers'
import { clientColumns, textsSupportClient } from 'src/constants/consts'
import TextPanel from 'src/@core/components/text-panel/textPanel'

const FormLayoutsIconsSupportClient = () => {
  const { smartNotaryContract, fetchClients, setTransactionAlert, setTransactionErrorAlert } = useContext(Web3Context)
  const [clients, setClients] = useState<any[]>()
  const [address, setAddress] = useState<string>('')

  useEffect(() => {
    getClients()
  }, [smartNotaryContract])

  const getClients = async () => {
    const cls = await fetchClients()
    setClients(cls)
  }

  const selectClient = (address: string) => {
    console.log('the address from tab', address)
    setAddress(address)
  }

  // const createClient = async (): Promise<any> => {
  const supportClient = async (): Promise<any> => {
    try {
      const options = { value: ethers.utils.parseEther('1') }
      const transaction = await smartNotaryContract.supportSmartCLient(address, options)
      setTransactionAlert(true)

      return transaction
    } catch (error) {
      setTransactionErrorAlert(true)
      console.log(error)
    }
  }

  return (
    <Card>
      <CardHeader title='Support Client' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <TextPanel title='Info' texts={textsSupportClient} />
      </CardContent>
      <CardContent>
        <Card>
          <CardHeader title='Available Clients' titleTypographyProps={{ variant: 'h6' }} />
          <AllPurposeTable elements={clients ? clients : []} method={selectClient} columns={clientColumns} />
        </Card>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth

                // value={account && account !== "undefined" ? account : ""}
                value={address}
                label='Filecoin address (starting with 0x...)'
                placeholder='Address of the client'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SignatureFreehand />
                    </InputAdornment>
                  )
                }}
                onChange={(e: any) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large' onClick={supportClient}>
                Support Client
              </Button>

              <StepLabel>
                {' '}
                You need to have TFIl in your wallet and be a Notary. Supporting a Client implies staking TFIL as a
                warrantee
              </StepLabel>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsIconsSupportClient
