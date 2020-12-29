import { parseISO, formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Props {
  dateString: string,
}

const RelativeDate = ({ dateString }: Props) => {
  const date = parseISO(dateString)
  const relativeDate = formatRelative(date, new Date(), {
    locale: ptBR
  })

  const relativeDateWithoutTime = relativeDate.replace(/ às.*$/, '')

  return <time dateTime={dateString}>{relativeDateWithoutTime}</time>
}

export default RelativeDate
