# How to run

This repo is written in javascript modules and requires node 18 or higher.

To run the tests execute:

```bash
node ./asciibox.test.mjs --test --input-type=module
```

If you run into out of memory errors you can append 


```bash
--max-old-space-size=90096
```

to the command