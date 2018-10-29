// This test file uses the tape testing framework. 
// To learn more, go here: https://github.com/substack/tape
const test = require('tape');

// instantiate an app from the DNA JSON bundle
const app = Container.loadAndInstantiate("dist/bundle.json")

// activate the new instance
app.start()

test('can create a task', (t) => {
  t.plan(1)
  const input = JSON.stringify({
    text: "my first thing to do"
  })
  const result = app.call("tasks", "main", "create_task", input)
  t.equal(result, JSON.stringify({ address: "QmSHW6f4xnePuBf55kWwBFc5srtNGv98k9LuMB8xBoRq5Z" }))
})

test('can list tasks', (t) => {
  t.plan(1)
  const input = JSON.stringify({})
  const result = app.call("tasks", "main", "list_tasks", input)
  const parsed = JSON.parse(result)
  const expected = {
    text: "my first thing to do",
    complete: false
  }
  t.deepEqual(parsed[0], expected)
})
