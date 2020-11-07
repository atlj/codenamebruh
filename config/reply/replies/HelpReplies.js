let keywords = ['help', 'yardım', 'h'];
keywords = keywords.map((element) => process.env.COMMANDPREFIX + element);

const replies = ['```⚙️\nKullanılabilir komutlar:\n```'];

export {keywords, replies};
