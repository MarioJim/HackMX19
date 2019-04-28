const isInAPhishingList = async url => {
  const data = await fetch('https://openphish.com/feed.txt');
  const text = await data.text();
  const phishingWebsites = text.split('\n');
  const result = document.createElement('p');
  if (phishingWebsites.includes(url)) {
    result.classList.add('important');
    result.appendChild(document.createTextNode('This website has been reported as a phishing website'));
  } else result.appendChild(document.createTextNode("This website hasn't been flagged as phishing"));
  return result;
};

const usesIPAddress = url => {
  const regex1 = /\d{1-3}\.\d{1-3}\.\d{1-3}\.\d{1-3}/;
  const regex2 = /0x[A-F0-9][A-F0-9]?\.0x[A-F0-9][A-F0-9]?\.0x[A-F0-9][A-F0-9]?\.0x[A-F0-9][A-F0-9]?/;
  return regex1.test(url) || regex2.test(url);
};

const urlIsTooLong = url => {
  return url.length > 75;
};

const shortenedUrl = url => {
  return (
    url.includes('bit.ly') ||
    url.includes('goo.gl') ||
    url.includes('tinyurl') ||
    url.includes('tiny.cc') ||
    url.includes('lc.chat') ||
    url.includes('is.gd')
  );
};

const hasAt = url => {
  return url.includes('@');
};

const lastOccurenceOfDoubleSlashes = url => {
  return url.lastIndexOf('//') > 6 && !url.startsWith('chrome');
};

const hasDashInDomain = url => {
  const domain = url.split('/')[2];
  return domain.includes('-');
};

const isntHTTPS = url => {
  return !url.startsWith('https');
};

function results(url) {
  const result = [];
  if (usesIPAddress(url))
    result.push(document.createElement('p').appendChild(document.createTextNode('URL uses IP Address')));
  if (urlIsTooLong(url))
    result.push(document.createElement('p').appendChild(document.createTextNode('URL is too long')));
  if (shortenedUrl(url))
    result.push(document.createElement('p').appendChild(document.createTextNode('URL is shortened')));
  if (hasAt(url)) result.push(document.createElement('p').appendChild(document.createTextNode('URL has an @')));
  if (lastOccurenceOfDoubleSlashes(url))
    result.push(document.createElement('p').appendChild(document.createTextNode('URL redirects to link after //')));
  if (hasDashInDomain(url))
    result.push(
      document.createElement('p').appendChild(document.createTextNode('Dashes are rarely used in legitimate URLs'))
    );
  if (isntHTTPS(url))
    result.push(document.createElement('p').appendChild(document.createTextNode("URL doesn't use https")));
  if (result.length === 0)
    result.push(document.createElement('p').appendChild(document.createTextNode('This URL passes all checks')));
  return result;
}

document.addEventListener(`DOMContentLoaded`, event => {
  document.getElementById('evaluate-button').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.get(tabs[0].id, async tab => {
        document.getElementById('alerts').innerHTML = '';
        document.getElementById('alerts').appendChild(await isInAPhishingList(tab.url));
        document
          .getElementById('alerts')
          .appendChild(document.createElement('p').appendChild(document.createTextNode('Possible alerts:')));
        const res = results(tab.url);
        for (const r of res) {
          document.getElementById('alerts').appendChild(document.createElement('br'));
          document.getElementById('alerts').appendChild(r);
        }
      });
    });
  });
});
