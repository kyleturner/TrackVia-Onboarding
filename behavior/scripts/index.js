'use strict'

exports.handle = (client) => {
  // Create steps
  const sayHello = client.createStep({
    satisfied() {
      // Boolean(client.getConversationState().helloSent)
      return false
    },
    prompt() {
      client.addResponse('provide/instructions')
      client.updateConversationState({
        helloSent: true
      })
      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('apology/untrained')
      client.done()
    }
  })

  const handleGreeting = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('Hello world, I mean human.')
      client.done()
    }
  })

  const handleGoodbye = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('See you later!')
      client.done()
    }
  })

  client.runFlow({
    classifications: {
      // map inbound message classifications to names of streams
      goodby: 'goodbye',
      greeting: 'greeting'
    },
    autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    },
    streams: {
      goodbye: handleGoodbye,
      greeting: handleGreeting,
      main: 'onboarding',
      onboarding: [sayHello],
      end: [untrained],
    },
  })
}
