import prepareAppOptions from "./prepare-app-options";

const libPort = "8080";
const modelPort = "8081";
const debug = false;

const defaultPreparedOptions = {
  backgroundColor: "rgba(255, 255, 255, 0)",
  debug: false,
  format: "image/png",
  width: 1024,
  height: 1024,
  inputPath: "http://localhost:8081/some_model.glb",
  libPort: "8080",
  outputPath: "./some_image.png",
  quality: 0.92,
  timeout: 10000,
};

function getArgv(optionalAndOverrides = {}) {
  const required = {
    input: "./some_model.glb",
    output: "./some_image.png",
    image_format: "image/png",
  };

  return {
    ...required,
    ...optionalAndOverrides,
  };
}

test("handles defaults", () => {
  const argv = getArgv();

  expect(prepareAppOptions({ libPort, modelPort, debug, argv })).toEqual(
    defaultPreparedOptions
  );
});

test("handles args", () => {
  const argv = getArgv({
    width: 2048,
    height: 2048,
    timeout: 2000,
    image_quality: 1,
    color: "rgba(255, 0, 255, 0)",
  });

  expect(prepareAppOptions({ libPort, modelPort, debug, argv })).toEqual({
    ...defaultPreparedOptions,
    backgroundColor: "rgba(255, 0, 255, 0)",
    width: 2048,
    height: 2048,
    quality: 1,
    timeout: 2000,
  });
});

test("handles jpg format", () => {
  const argv = getArgv({
    output: "./some_image.jpg",
    image_format: "image/jpeg",
  });

  expect(prepareAppOptions({ libPort, modelPort, debug, argv })).toEqual({
    ...defaultPreparedOptions,
    outputPath: "./some_image.jpg",
    format: "image/jpeg",
    backgroundColor: "rgba(255, 255, 255, 1)",
  });
});

test("handles jpg with color override", () => {
  const argv = getArgv({
    output: "./some_image.jpg",
    image_format: "image/jpeg",
    color: "rgba(255, 0, 255, 1)",
  });

  expect(prepareAppOptions({ libPort, modelPort, debug, argv })).toEqual({
    ...defaultPreparedOptions,
    outputPath: "./some_image.jpg",
    format: "image/jpeg",
    backgroundColor: "rgba(255, 0, 255, 1)",
  });
});
