import formatUnicorn from 'format-unicorn/safe';
import { useEffect, useMemo, useState } from 'react';

type TTextParams = { [name: string]: any };

const readFromFile = async (filepath: string): Promise<string> => {
  const data = await fetch(filepath);
  const text = await data.text();
  return text;
};

const formatText = (raw: string, params?: TTextParams): string => {
  if (params) {
    return formatUnicorn(raw, params).trim();
  }
  return raw.trim();
};

const useReadFromFile = (filename: string, params?: TTextParams): string => {
  const [raw, setRaw] = useState('');

  useEffect(() => {
    readFromFile(`/static/${filename}`).then((text) => {
      setRaw(text);
    });
  }, [filename]);

  const data = useMemo(() => formatText(raw, params), [params, raw]);
  return data;
};

export default useReadFromFile;
