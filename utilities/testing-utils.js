"use strict";

exports.runTestsTo = (solution, testCases) => {
  let failureCount = 0;

  // Add line break to console output.
  console.log();

  if (Array.isArray(testCases)) {
    testCases.forEach((testCase) => {
      const expectedOutput =
          Array.isArray(testCase) && testCase.length > 0
            ? testCase.pop()
            : undefined,
        actualOutput = solution(testCase);

      expectedOutput === actualOutput
        ? console.log("\x1b[32m", `✓ Output is ${actualOutput} as expected.`)
        : (failureCount++,
          console.log(
            "\x1b[31m",
            `✖ Output is ${actualOutput} but expected ${expectedOutput}.`
          ));
    });
  } else console.log("\x1b[31m", `✖ Test Cases aren't of type 'Array'.`);

  // Add line break to console output.
  console.log();

  failureCount <= 0
    ? console.log(
        "\x1b[32m",
        `✓ All tests for '${solution.name}' solution passed.`
      )
    : failureCount === testCases.length
    ? console.log(
        "\x1b[31m",
        `✖ All tests for '${solution.name}' solution failed.`
      )
    : console.log(
        "\x1b[31m",
        `✖ ${failureCount} of ${testCases.length} tests for '${solution.name}' solution failed.`
      );
  console.log();
};
