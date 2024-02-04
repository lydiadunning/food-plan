import { Flex, Card, Inset, Box } from '@radix-ui/themes'

const OutcomeOptionPicker = ({ kid, register, watch }) => {
  const watchOutcomes = watch(['outcomes'])

  const giveStyle = (outcomeOption) => {
    if (watchOutcomes[0] && watchOutcomes[0].includes(outcomeOption)) {
      return { backgroundColor: 'var(--amber-6)', padding: '6px' }
    } else {
      return { padding: '6px' }
    }
  }
  console.log('kid.outcomeOptions', kid.outcomeOptions, kid)

  return (
    <>
      {kid.outcomeOptions.length > 0 && (
        <Box>
          <label>What did {kid.name} do?</label>
          <Card style={{ backgroundColor: 'var(--amber-4)' }}>
            <Inset clip='padding-box'>
              <Flex direction='column' align='stretch'>
                {kid.outcomeOptions.map((option) => (
                  <label
                    key={option.id}
                    style={giveStyle(option.outcome)}
                    htmlFor={option.outcome}
                  >
                    {option.outcome}
                    <input
                      type='checkbox'
                      name='outcome'
                      id={option.outcome}
                      value={option.outcome}
                      style={{ visibility: 'hidden' }}
                      {...register('outcomes')}
                    />
                  </label>
                ))}
              </Flex>
            </Inset>
          </Card>
        </Box>
      )}
    </>
  )
}
export default OutcomeOptionPicker
