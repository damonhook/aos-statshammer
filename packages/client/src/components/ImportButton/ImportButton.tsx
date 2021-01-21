import { Button, ButtonProps } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'

const globalAny: any = global

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    display: 'none',
  },
}))

interface ImportWrapperProps extends Omit<ButtonProps, 'component' | 'onClick'> {
  id: string
  children: React.ReactNode
  onImport?: (data: any) => void
  multiple?: boolean
}

const ImportWrapper = ({ id, children, onImport, multiple, ...props }: ImportWrapperProps) => {
  const classes = useStyles()

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new globalAny.FileReader()
        reader.onload = () => {
          const data = JSON.parse(reader.result)
          if (onImport) onImport(data)
        }
        reader.readAsText(file)
      })
    }
    event.target.value = ''
  }

  return (
    <div>
      <input
        accept="application/json"
        className={classes.input}
        id={id}
        multiple={!!multiple}
        type="file"
        onChange={handleImport}
      />
      <label htmlFor={id}>
        <Button component={'span'} {...props}>
          {children}
        </Button>
      </label>
    </div>
  )
}

export default ImportWrapper
