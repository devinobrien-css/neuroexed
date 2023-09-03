export const post = (title, date, content) => {
  return {
    title: { S: title },
    date: { S: date },
    data: {
      M: {
        content: { S: content },
      },
    },
  };
};

export const podcast = (
  title,
  episode,
  season,
  date,
  transcript,
  summary,
  contributors,
) => {
  return {
    title: { S: title },
    season: { S: season },
    data: {
      M: {
        title: { S: title },
        date: { S: date },
        episode: { S: episode },
        season: { S: season },
        summary: { S: summary },
        transcript: { S: transcript },
        contributors: { L: contributors },
      },
    },
  };
};

export const message = (uid, from, subject, content, timestamp) => {
  return {
    message_id: { S: uid },
    timestamp: { N: "" + timestamp },
    data: {
      M: {
        content: { S: content },
        from: { S: from },
        subject: { S: subject },
      },
    },
  };
};

export const log = (date, type, content) => {
  return {
    date: { S: date },
    type: { S: type },
    content: { S: content },
  };
};

export const sort_order = (type, order) => {
  return {
    type: { S: type },
    sort: { L: order },
  };
};

export const project = (title, description, members = []) => {
  return {
    title: { S: title },
    data: {
      M: {
        description: { S: description },
        members: { L: members },
      },
    },
  };
};

export const affiliation = (title, source, slug) => {
  return {
    name: { S: title },
    data: {
      M: {
        source: { S: source },
        slug: { S: slug },
      },
    },
  };
};
