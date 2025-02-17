// C0de by twiez >:

import React, { useState } from 'react';

function App() {
  const [targetUrl, setTargetUrl] = useState('');
  const [googleDork, setGoogleDork] = useState('');
  const [postData, setPostData] = useState('');
  const [cookie, setCookie] = useState('');
  const [proxy, setProxy] = useState('');
  const [level, setLevel] = useState('1');
  const [risk, setRisk] = useState('1');
  const [verbosity, setVerbosity] = useState('1');
  const [useRandomAgent, setUseRandomAgent] = useState(false);
  const [useTor, setUseTor] = useState(false);
  
  // Techniques
  const [techniques, setTechniques] = useState({
    B: true,  // Boolean-based
    E: true,  // Error-based
    U: true,  // Union-based
    S: true,  // Stacked queries
    T: true,  // Time-based
    Q: true,  // Inline queries
  });

  // Enumeration options
  const [enumOptions, setEnumOptions] = useState({
    all: false,
    banner: false,
    currentUser: false,
    currentDb: false,
    passwords: false,
    databases: false,
    tables: false,
    columns: false,
    schema: false,
    dumpData: false,
  });

  // Advanced options
  const [advancedOptions, setAdvancedOptions] = useState({
    osShell: false,
    osPwn: false,
    batchMode: true,
    flushSession: false,
  });

  const [generatedCommand, setGeneratedCommand] = useState('');

  const generateCommand = () => {
    let command = 'sqlmap';

    // Target options
    if (targetUrl) command += ` -u "${targetUrl}"`;
    if (googleDork) command += ` -g "${googleDork}"`;
    if (postData) command += ` --data="${postData}"`;
    if (cookie) command += ` --cookie="${cookie}"`;

    // Connection options
    if (useRandomAgent) command += ' --random-agent';
    if (useTor) command += ' --tor';
    if (proxy) command += ` --proxy="${proxy}"`;

    // Detection options
    command += ` --level=${level} --risk=${risk} -v ${verbosity}`;

    // Techniques
    let activeTechniques = '';
    Object.entries(techniques).forEach(([tech, isEnabled]) => {
      if (isEnabled) {
        activeTechniques += tech;
      }
    });
    if (activeTechniques) {
      command += ` --technique=${activeTechniques}`;
    }

    // Enumeration options
    if (enumOptions.all) {
      command += ' --all';
    } else {
      if (enumOptions.banner) command += ' --banner';
      if (enumOptions.currentUser) command += ' --current-user';
      if (enumOptions.currentDb) command += ' --current-db';
      if (enumOptions.passwords) command += ' --passwords';
      if (enumOptions.databases) command += ' --dbs';
      if (enumOptions.tables) command += ' --tables';
      if (enumOptions.columns) command += ' --columns';
      if (enumOptions.schema) command += ' --schema';
      if (enumOptions.dumpData) command += ' --dump';
    }

    // Advanced options
    if (advancedOptions.osShell) command += ' --os-shell';
    if (advancedOptions.osPwn) command += ' --os-pwn';
    if (advancedOptions.batchMode) command += ' --batch';
    if (advancedOptions.flushSession) command += ' --flush-session';

    setGeneratedCommand(command);
  };

  // Handle --all option disabling other enumeration options
  const handleAllOptionChange = (checked: boolean) => {
    setEnumOptions({
      ...enumOptions,
      all: checked,
      banner: false,
      currentUser: false,
      currentDb: false,
      passwords: false,
      databases: false,
      tables: false,
      columns: false,
      schema: false,
      dumpData: false
    });
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-gray-100 pb-8">
      {/* Header */}
      <header className="p-4 border-b border-gray-800">
        <div className="container mx-auto flex items-center gap-3">
          <img 
            src="https://avatars.githubusercontent.com/u/104163472?s=400&u=4598d1f4702fd1c32f8dfa7b5399b9e569d21c05&v=4" 
            alt="Twiez Logo" 
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-2xl text-gray-100">SQLMap Komut Oluşturucu</h1>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        {/* Target Options */}
        <section className="bg-[#222222] rounded-lg p-6">
          <h2 className="text-xl text-gray-100 mb-4 flex items-center gap-2">
            Hedef Seçenekleri
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">Hedef URL:</label>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="http://example.com/vuln.php?id=1"
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded p-2 text-gray-300 focus:border-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Google Dork:</label>
              <input
                type="text"
                value={googleDork}
                onChange={(e) => setGoogleDork(e.target.value)}
                placeholder="inurl:*.php?id=1*"
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded p-2 text-gray-300 focus:border-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">POST Data:</label>
              <input
                type="text"
                value={postData}
                onChange={(e) => setPostData(e.target.value)}
                placeholder="id=1&user=admin"
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded p-2 text-gray-300 focus:border-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Cookie:</label>
              <input
                type="text"
                value={cookie}
                onChange={(e) => setCookie(e.target.value)}
                placeholder="PHPSESSID=abc123"
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded p-2 text-gray-300 focus:border-gray-500 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Connection Options */}
        <section className="bg-[#222222] rounded-lg p-6">
          <h2 className="text-xl text-gray-100 mb-4">Bağlantı Seçenekleri</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useRandomAgent}
                  onChange={(e) => setUseRandomAgent(e.target.checked)}
                  className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
                />
                <span>Random User-Agent</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useTor}
                  onChange={(e) => setUseTor(e.target.checked)}
                  className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
                />
                <span>Tor Network Kullan</span>
              </label>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Proxy:</label>
              <input
                type="text"
                value={proxy}
                onChange={(e) => setProxy(e.target.value)}
                placeholder="http://127.0.0.1:8080"
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded p-2 text-gray-300 focus:border-gray-500 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Detection Options */}
        <section className="bg-[#222222] rounded-lg p-6">
          <h2 className="text-xl text-gray-100 mb-4">Keşif Seçenekleri</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">Level (1-5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded p-2 text-gray-300 focus:border-gray-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 mb-1">Risk (1-3):</label>
              <input
                type="number"
                min="1"
                max="3"
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded p-2 text-gray-300 focus:border-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Verbosity (0-6):</label>
              <input
                type="number"
                min="0"
                max="6"
                value={verbosity}
                onChange={(e) => setVerbosity(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded p-2 text-gray-300 focus:border-gray-500 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Techniques */}
        <section className="bg-[#222222] rounded-lg p-6">
          <h2 className="text-xl text-gray-100 mb-4">Teknikler</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={techniques.B}
                onChange={(e) => setTechniques({...techniques, B: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Boolean-based (B)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={techniques.E}
                onChange={(e) => setTechniques({...techniques, E: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Error-based (E)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={techniques.U}
                onChange={(e) => setTechniques({...techniques, U: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Union-based (U)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={techniques.S}
                onChange={(e) => setTechniques({...techniques, S: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Stacked (S)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={techniques.T}
                onChange={(e) => setTechniques({...techniques, T: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Time-based (T)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={techniques.Q}
                onChange={(e) => setTechniques({...techniques, Q: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Inline (Q)</span>
            </label>
          </div>
        </section>

        {/* Enumeration */}
        <section className="bg-[#222222] rounded-lg p-6">
          <h2 className="text-xl text-gray-100 mb-4">Numaralandırma</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enumOptions.all}
                onChange={(e) => handleAllOptionChange(e.target.checked)}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>All (--all)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enumOptions.banner}
                disabled={enumOptions.all}
                onChange={(e) => setEnumOptions({...enumOptions, banner: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Banner</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enumOptions.currentUser}
                disabled={enumOptions.all}
                onChange={(e) => setEnumOptions({...enumOptions, currentUser: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Current User</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enumOptions.currentDb}
                disabled={enumOptions.all}
                onChange={(e) => setEnumOptions({...enumOptions, currentDb: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Current DB</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enumOptions.passwords}
                disabled={enumOptions.all}
                onChange={(e) => setEnumOptions({...enumOptions, passwords: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Passwords</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enumOptions.databases}
                disabled={enumOptions.all}
                onChange={(e) => setEnumOptions({...enumOptions, databases: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Databases</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enumOptions.tables}
                disabled={enumOptions.all}
                onChange={(e) => setEnumOptions({...enumOptions, tables: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Tables</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enumOptions.columns}
                disabled={enumOptions.all}
                onChange={(e) => setEnumOptions({...enumOptions, columns: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Columns</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enumOptions.schema}
                disabled={enumOptions.all}
                onChange={(e) => setEnumOptions({...enumOptions, schema: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Schema</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enumOptions.dumpData}
                disabled={enumOptions.all}
                onChange={(e) => setEnumOptions({...enumOptions, dumpData: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Dump Data</span>
            </label>
          </div>
        </section>

        {/* Advanced Options */}
        <section className="bg-[#222222] rounded-lg p-6">
          <h2 className="text-xl text-gray-100 mb-4">Gelişmiş Ayarlar</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={advancedOptions.osShell}
                onChange={(e) => setAdvancedOptions({...advancedOptions, osShell: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>OS Shell</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={advancedOptions.osPwn}
                onChange={(e) => setAdvancedOptions({...advancedOptions, osPwn: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>OS Pwn</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={advancedOptions.batchMode}
                onChange={(e) => setAdvancedOptions({...advancedOptions, batchMode: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Batch Mode</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={advancedOptions.flushSession}
                onChange={(e) => setAdvancedOptions({...advancedOptions, flushSession: e.target.checked})}
                className="rounded border-gray-600 text-gray-500 focus:ring-gray-500"
              />
              <span>Flush Session</span>
            </label>
          </div>
        </section>

        {/* Command Generation */}
        <section className="space-y-4">
          <button
            onClick={generateCommand}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium"
          >
            Komutu Göster
          </button>

          <div className="bg-[#222222] rounded-lg p-6">
            <h3 className="text-lg text-gray-100 mb-2">Oluşturulan Komut</h3>
            <div className="bg-[#1A1A1A] p-4 rounded font-mono text-sm">
              {generatedCommand || 'Komut henüz oluşturulmadı'}
            </div>
            {generatedCommand && (
              <button
                onClick={() => navigator.clipboard.writeText(generatedCommand)}
                className="mt-4 bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded text-sm"
              >
                Komutu Kopyala
              </button>
            )}
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 text-center text-gray-500 text-sm">
        <p>SQLmap Komut Oluşturucu</p>
        <a 
          href="https://github.com/twiez" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition-colors"
        >
          Twiez Tarafından Hazırlanmıştır
        </a>
      </footer>
    </div>
  );
}

export default App;