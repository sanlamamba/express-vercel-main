async function ErrorWithin(fn, res, duration) {
  const id = setTimeout(() => {
    res.status(500).json({
      message: "There was an error with the upstream service!",
    });
  }, duration);

  try {
    let data = await fn();
    clearTimeout(id);
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ErrorWithin;
