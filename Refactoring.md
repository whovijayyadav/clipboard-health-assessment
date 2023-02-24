# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The code had too many if-elses to follow what was happening and this could create some paths which don't get tested well or which could introduce bugs. Setting the default value of candidate to "0" and moving out the reusable part where a hash is getting created helped simplify the code and clean it up too. I also moved the constant variable MAX_PARTITION_KEY_LENGTH out of the function as it probably is not only limited to this function. It seems more cleaner now, concise and comprehendable.