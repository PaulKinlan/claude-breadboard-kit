# Open AI Google Labs Breadboard

The LLM Starter Kit is a collection of [Breadboard](https://github.com/google/labs-prototypes/tree/main/seeds/breadboard) nodes that are helpful for building LLM-based (Generative AI) applications.

## Installing

LLM Starter Kit requires Node version >=v19.0.0. To install:

```sh
npm install @google-labs/llm-starter
```

## Node Types

Here are all node handlers that are included in the LLM Starter Kit.

### The `generateText` node

This is a [PaLM API](https://developers.generativeai.google/) text completion node. This node is probably the main reason this starter kit exists. To produce useful output, the node needs an `PALM_KEY` input and the `text` input.

#### Example:

Given this input:

```json
{
  "PALM_KEY": "<your API key>",
  "text": "How old is planet Earth?"
}
```

The node will produce this output:

```json
{
  "completion": "It is about 4.5 billion years old."
}
```

#### Inputs:

- `OPENAI_API_KEY` required, must contain the Google Cloud Platform API key for the project has the "Generative Language API" API enabled.
- `text` required, sent as the prompt for the completion.
- `stopSequences` optional array of strings. These will be passed as the stop sequences to the completion API.

#### Outputs:

- `completion` - result of the PaLM API text completion.
