# "Google Labs Breadboard" Kit for the OpenAI API

The OpenAI Breadboard Kit is a collection of [Breadboard](https://github.com/google/labs-prototypes/tree/main/seeds/breadboard) nodes that are helpful for building LLM-based (Generative AI) applications using the OpenAI API.

## Installing

OpenAI Breadboard Kit requires Node version >=v19.0.0. To install:

```sh
npm install @paulkinlan/openai-breadboard-kit
```

## Node Types

Here are all node handlers that are included in the OpenAI Breadboard Kit

### The `generateText` node

This is an [OpenAI API](https://platform.openai.com/docs) text completion node. To produce useful output, the node needs an `OPENAI_API_KEY` input and the `text` input and the `model` to run it against.

#### Example:

Given this input:

```json
{
  "OPENAI_API_KEY": "<your API key>",
  "text": "How much wood can a woodchuck chuck?"
}
```

The node will produce this output:

```json
{
  "completion": "The exact amount a woodchuck can chuck is unknown, but it is believed that they can chuck about 700 pounds of wood in a day."
}
```

#### Inputs:

- `OPENAI_API_KEY` required, must contain the Google Cloud Platform API key for the project has the "Generative Language API" API enabled.
- `text` required, sent as the prompt for the completion.
- `model` the name of the model OpenAI that you want to use.

#### Outputs:

- `completion` - result of the OpenAI API text completion.
