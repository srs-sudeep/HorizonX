import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/theme';
// Define types for our data structures

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
  outputClass: string;
}

const TerminalInterface = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    let output: React.ReactNode = null;
    let outputClass = '';

    switch (trimmedCmd.toLowerCase()) {
      case 'help':
        output = (
          <div className="space-y-2">
            <div className="text-primary font-bold mb-3">Available Commands:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { cmd: 'help', desc: 'Show this help message' },
                { cmd: 'clear', desc: 'Clear the terminal' },
                { cmd: 'date', desc: 'Show current date' },
                { cmd: 'echo [text]', desc: 'Echo text' },
                { cmd: 'whoami', desc: 'Show current user' },
                { cmd: 'ls', desc: 'List files' },
                { cmd: 'uptime', desc: 'Show system uptime' },
                { cmd: 'cat [file]', desc: 'Display file contents' },
              ].map(({ cmd, desc }) => (
                <div key={cmd} className="flex items-center space-x-3 p-2 bg-secondary rounded">
                  <span className="text-chip-yellow font-mono font-bold min-w-0 flex-shrink-0">
                    {cmd}
                  </span>
                  <span className="text-muted-foreground text-sm">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'date': {
        const now = new Date();
        output = (
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <div className="text-primary font-bold">Current Date & Time:</div>
            </div>
            <div className="bg-secondary p-3 rounded-lg">
              <div className="text-lg font-mono">{now.toDateString()}</div>
              <div className="text-2xl font-mono text-foreground">{now.toLocaleTimeString()}</div>
              <div className="text-sm text-muted-foreground mt-2">
                Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </div>
            </div>
          </div>
        );
        break;
      }
      case 'whoami':
        output = (
          <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg border">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-background font-bold">
              U
            </div>
            <div>
              <div className="font-bold text-primary">user</div>
              <div className="text-sm text-muted-foreground">System Administrator</div>
            </div>
          </div>
        );
        break;
      case 'lss': {
        // 'ls'
        const files = [
          { name: 'Documents/', type: 'directory', size: '4.0K', color: 'text-blue-500' },
          { name: 'Downloads/', type: 'directory', size: '4.0K', color: 'text-blue-500' },
          { name: 'script.sh', type: 'executable', size: '8.1K', color: 'text-green-500' },
          {
            name: 'config.txt',
            type: 'file',
            size: '1.0K',
            color: 'text-gray-600 dark:text-gray-400',
          },
          { name: 'archive.tar.gz', type: 'archive', size: '2.0K', color: 'text-orange-500' },
          { name: 'image.png', type: 'image', size: '512B', color: 'text-pink-500' },
        ];
        output = (
          <div className="space-y-2">
            <div className="text-primary font-bold mb-2">Directory Contents:</div>
            <div className="grid gap-1">
              {files.map(file => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-2 hover:secondary rounded"
                >
                  <div className="flex items-center space-x-3">
                    <span className={`font-mono ${file.color}`}>{file.name}</span>
                    <span className="text-xs px-2 py-1 bg-secondary rounded">{file.type}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{file.size}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      }
      case 'uptime':
        output = (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-success font-bold">System Status: Online</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">2d 7h</div>
                <div className="text-sm text-foreground">Uptime</div>
              </div>
              <div className="bg-background p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-success">1</div>
                <div className="text-sm text-foreground">Active Users</div>
              </div>
              <div className="bg-background p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-chip-yellow">0.15</div>
                <div className="text-sm text-foreground">Load Average</div>
              </div>
            </div>
          </div>
        );
        break;
      case 'cat sudeep.lead':
        output = (
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-chip-purple/10 to-chip-blue/10 rounded-lg border border-chip-purple">
            <div className="w-12 h-12 bg-gradient-to-r from-chip-purple to-chip-blue rounded-full flex items-center justify-center text-background font-bold text-lg">
              S
            </div>
            <div>
              <div className="text-lg font-bold text-chip-purple">Sudeep - Team Lead</div>
              <div className="text-foreground">4th year CSE IIT Bhilai</div>
              <div className="text-sm text-muted-foreground mt-1">Leading the development team</div>
            </div>
          </div>
        );
        outputClass = 'success';
        break;
      case 'cat naman.frontend':
        output = (
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-success/10 to-success/20 rounded-lg border border-success">
            <div className="w-12 h-12 bg-gradient-to-r from-success to-success/30 rounded-full flex items-center justify-center text-background font-bold text-lg">
              N
            </div>
            <div>
              <div className="text-lg font-bold text-success">Naman - Frontend Developer</div>
              <div className="text-foreground ">2nd year CSE IIT Bhilai</div>
              <div className="text-sm text-muted-foreground  mt-1">
                Building beautiful user interfaces
              </div>
            </div>
          </div>
        );
        outputClass = 'success';
        break;
      case 'cat slok.fullstack':
        output = (
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-chip-purple/10 to-chip-purple/20 rounded-lg border border-chip-purple">
            <div className="w-12 h-12 bg-gradient-to-r from-chip-purple to-chip-purple/30 rounded-full flex items-center justify-center text-background font-bold text-lg">
              S
            </div>
            <div>
              <div className="text-lg font-bold text-chip-purple">Slok - Full Stack Developer</div>
              <div className="text-foreground ">2nd year CSE IIT Bhilai</div>
              <div className="text-sm text-muted-foreground  mt-1">
                Full stack development expertise
              </div>
            </div>
          </div>
        );
        outputClass = 'success';
        break;
      case 'ls': //'cat rohit.frontend'
        output = (
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg border border-primary">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/30 rounded-full flex items-center justify-center text-background font-bold text-lg">
              R
            </div>
            <div>
              <div className="text-lg font-bold text-primary">Rohit - Frontend Developer</div>
              <div className="text-foreground">2nd year Electrical IIT Bhilai</div>
              <div className="text-sm text-muted-foreground mt-1">
                Creating responsive web experiences
              </div>
            </div>
          </div>
        );
        outputClass = 'success';
        break;
      case 'neofetch':
        output = (
          <div style={{ display: 'flex' }}>
            <pre className="whitespace-pre text-sm font-mono leading-tight text-foreground">
              {`
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMNOdlccclx0NMMMMMMMMMMMMMMMMMMMMMMMM
MMMXd'        .,xNMMMMMMMMMMMMMMMMMMMMMM
MM0;             :KMMMMMMMMMMMMMMMMMMMMM
MX:               lNMMMMMMMMMMMWKdllkNMM
M0'               ,KMMMMMMMMMMM0,   .dWM
MK;               '0MMMMMMMMMMMk.   .kWM
MWk.               :kKMMMMMMMMK:.'lxKWMM
MMW0:.               'lkKXXKOo'.cXWMMMMM
MMMMW0d:,'.',clol:'     ....   '0MMMMMMM
MMMMMMMMWNNNWMMMMWXxl'         .kMMMMMMM
MMMMMMMMMMMMMMMMMMMMW0'         oWMMMMMM
MMMMMMMMMMMMMMMMMMMMMWx.       'OMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMWk:.. .'c0WMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMWX00KNWMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
                `}
            </pre>
            <div className="max-w-2xl mx-auto  p-6 rounded-xl font-mono text-sm transition-colors duration-300">
              <p>
                <span className="text-success">HorizonX</span>@
                <span className="text-primary">iitbhilai</span>
              </p>
              <hr className="my-2 border-border" />

              <div className="space-y-1 text-muted-foreground">
                <p>
                  <span className="font-semibold text-success">Origin:</span> IIT Bhilai
                </p>
                <p>
                  <span className="font-semibold text-success">Incubation:</span> IBITF
                </p>
                <p>
                  <span className="font-semibold text-success">Kernel:</span> 6.15.2-arch1-1
                </p>
                <p>
                  <span className="font-semibold text-success">Uptime:</span> 3 hours, 33 mins
                </p>
                <p>
                  <span className="font-semibold text-success">Packages:</span> 1094 (pacman), 39
                  (flatpak)
                </p>
                <p>
                  <span className="font-semibold text-success">Shell:</span> nu 0.105.1
                </p>
                <p>
                  <span className="font-semibold text-success">Resolution:</span> 2560x1440
                </p>
                <p>
                  <span className="font-semibold text-success">DE:</span> Hyprland
                </p>
                <p>
                  <span className="font-semibold text-success">Theme:</span> {theme.theme}
                </p>
              </div>

              <div className="mt-4 flex gap-1">
                <div className="w-5 h-3 rounded-sm bg-destructive"></div>
                <div className="w-5 h-3 rounded-sm bg-success"></div>
                <div className="w-5 h-3 rounded-sm bg-chip-yellow"></div>
                <div className="w-5 h-3 rounded-sm bg-primary"></div>
                <div className="w-5 h-3 rounded-sm bg-chip-purple"></div>
                <div className="w-5 h-3 rounded-sm bg-chip-blue"></div>
                <div className="w-5 h-3 rounded-sm bg-muted-foreground"></div>
              </div>
            </div>
          </div>
        );
        outputClass = 'success';
        break;
      case 'team':
        output = (
          <>
            <div className="flex flex-wrap justify-center gap-6 p-6">
              {[
                { name: 'Sudeep ranjan sahoo', role: 'Team Lead', img: '/team/srs.jpg' },
                { name: 'Naman Sharma', role: 'Frontend developer', img: '/team/naman.jpg' },
                { name: 'Rohit', role: 'Frontend developer', img: '/team/rohit.jpg' },
                { name: 'Slok', role: 'Full stack developer', img: '/team/slok.jpg' },
                { name: 'Ujjwal raj', role: 'Backend developer', img: '/team/uj.jpg' },
              ].map((member, i) => (
                <div
                  key={i}
                  className="w-64 sm:w-60 bg-background rounded-2xl shadow-md p-4 text-center transition hover:scale-[1.02]"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-20 h-20 mx-auto rounded-full object-cover mb-3"
                  />
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </>
        );
        outputClass = 'success';
        break;
      case 'faculty':
        output = (
          <>
            <div className="flex flex-wrap justify-center gap-6 p-6">
              {[
                { name: 'Prof. Santosh Biswas', role: '', img: '/team/santosh.jpg' },
                { name: 'Dr. Amit Kumar Dhar', role: '', img: '/team/amit.jpg' },
                { name: 'Dr. Gagan Raj Gupta', role: '', img: '/team/gagan.jpg' },
                { name: 'Dr. Anand Baswade', role: '', img: '/team/anand.jpg' },
              ].map((member, i) => (
                <div
                  key={i}
                  className="w-64 sm:w-60 bg-background rounded-2xl shadow-md p-4 text-center transition hover:scale-[1.02]"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-20 h-20 mx-auto rounded-full object-cover mb-3"
                  />
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </>
        );
        outputClass = 'success';
        break;

      default:
        if (trimmedCmd.startsWith('echo ')) {
          const text = trimmedCmd.substring(5);
          output = (
            <div className="flex items-center space-x-3 p-3 bg-chip-yellow/10 rounded-lg border border-chip-yellow">
              <div className="text-chip-yellow">💬</div>
              <div className="text-foreground font-medium">{text}</div>
            </div>
          );
        } else {
          output = (
            <div className="flex items-center space-x-3 p-3 bg-destructive/10 rounded-lg border border-destructive/30">
              <div className="text-destructive">❌</div>
              <div>
                <div className="text-destructive font-bold">Command not found: {trimmedCmd}</div>
                <div className="text-sm text-foreground mt-1">
                  Type <span className="font-mono bg-secondary px-1 rounded">help</span> to see
                  available commands
                </div>
              </div>
            </div>
          );
          outputClass = 'error';
        }
    }

    if (command !== 'clear')
      setHistory(prev => [...prev, { command: trimmedCmd, output, outputClass }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(command);
      setCommand('');
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  function getGhostSuggestion(input: string, commands: string[]): string | null {
    if (!input) return null;
    const match = commands.find(cmd => cmd.startsWith(input));
    return match && match !== input ? match : null;
  }
  const commands = [
    'help',
    'clear',
    'date',
    'whoami',
    'ls',
    'uptime',
    'cat sudeep.lead',
    'cat naman.frontend',
    'cat slok.fullstack',
    'cat rohit.frontend',
    'neofetch',
  ];
  const suggestion = getGhostSuggestion(command, commands);
  const ghost = suggestion ? suggestion.slice(command.length) : '';

  return (
    <div>
      <div className="text-success transition-colors duration-300 bg-muted/10 mt-24">
        <div className=" flex justify-center pt-8 pb-8">
          <div className="relative group justify-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-center tracking-widest">
              <span className="inline-block px-12 py-4 text-foreground relative overflow-hidden transition-all duration-500 ease-out hover:text-foreground">
                About us
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground group-hover:w-full transition-all duration-700 ease-out"></span>
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mx-auto leading-relaxed text-center">
              More than code – this is our story.
            </p>
          </div>
        </div>
        {/* Terminal Container - Fixed height and centered */}

        <div className="h-screen items-center justify-center  relative z-10 w-full hidden lg:flex ">
          <div className="w-full max-w-6xl h-5/6 flex flex-col">
            {/* Terminal Header */}
            <div className="bg-muted border rounded-t-lg p-3 flex items-center gap-2 shadow-lg flex-shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-chip-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
              </div>
              <div className="ml-auto text-foreground text-xs font-medium">
                HorizonX@iitbhilai: ~
              </div>
            </div>

            {/* Terminal Window - Scrollable content area */}
            <div
              className="bg-background border border-t-0 rounded-b-lg flex-1 flex flex-col overflow-hidden cursor-text shadow-xl"
              onClick={handleClick}
              ref={terminalRef}
              style={{
                background:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 197, 94, 0.03) 2px, rgba(34, 197, 94, 0.03) 4px)',
              }}
            >
              {/* Scrollable Content Container */}
              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
              >
                {/* Welcome Message */}
                <div className="mb-6 space-y-2">
                  <div className="text-primary font-bold text-lg">
                    Welcome to Terminal Interface
                  </div>
                  <div className="text-foreground">
                    Type{' '}
                    <span className="text-chip-yellow font-semibold bg-background px-2 py-1 rounded">
                      help
                    </span>{' '}
                    to see all available commands
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-muted-foreground/30 dark:via-secondary to-transparent my-4"></div>
                </div>

                {/* Command History */}
                {history.map((entry, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center mb-2 bg-secondary rounded-lg p-2">
                      <span className="text-success font-bold mr-3">
                        <span className="text-chip-blue">HorizonX</span>
                        <span className="text-muted-foreground">@</span>
                        <span className="text-chip-yellow">iitbhilai</span>
                        <span className="text-muted-foreground">:</span>
                        <span className="text-chip-purple">~</span>
                        <span className="text-muted-foreground">$</span>
                      </span>
                      <span className="text-foreground font-medium">{entry.command}</span>
                    </div>
                    {entry.output && (
                      <div
                        className={`ml-6 ${
                          entry.outputClass === 'error'
                            ? ''
                            : entry.outputClass === 'success'
                              ? ''
                              : entry.outputClass === 'warning'
                                ? ''
                                : ''
                        }`}
                      >
                        {entry.output}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Fixed Input Area at Bottom */}
              <div className="flex-shrink-0 p-6 pt-0">
                {/* Input Line */}
                <div className="flex items-center font-mono text-base rounded-md px-4 py-2 transition-colors shadow-sm">
                  {/* Prompt */}
                  <span className="text-success font-bold mr-3 whitespace-nowrap">
                    <span className="text-chip-blue">HorizonX</span>
                    <span className="text-muted-foreground">@</span>
                    <span className="text-chip-yellow">iitbhilai</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-chip-purple">~</span>
                    <span className="text-muted-foreground">$</span>
                  </span>

                  {/* Input with ghost suggestion */}
                  <div className="relative w-full">
                    {/* Ghost suggestion layer */}
                    <div className="absolute inset-0 px-0 py-0 pointer-events-none select-none whitespace-pre">
                      <span className="text-transparent">{command}</span>
                      <span className="text-muted-foreground">{ghost}</span>
                    </div>

                    {/* Actual input */}
                    <input
                      ref={inputRef}
                      type="text"
                      value={command}
                      onChange={e => setCommand(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-transparent border-none outline-none text-foreground placeholder-muted-foreground"
                      placeholder="Type a command..."
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </div>
                </div>

                {/* Quick Commands */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {['help', 'ls', 'whoami', 'date', 'clear', 'neofetch', 'team', 'faculty'].map(
                    cmd => (
                      <button
                        key={cmd}
                        onClick={() => {
                          setCommand(cmd);
                          inputRef.current?.focus();
                        }}
                        className="px-3 py-1 text-xs bg-secondary text-foreground rounded-full hover:bg-muted-foreground transition-colors border border-border"
                      >
                        {cmd}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-foreground block lg:hidden w-[80%] ml-[10%] mr-[10%]">
          <p className="text-[17px] font-light leading-relaxed mb-6">
            We are a group of passionate minds from IIT Bhilai, driven by curiosity, collaboration,
            and a shared vision for creating impactful digital experiences. What started as a simple
            idea evolved into a platform where innovation, purpose, and user experience come
            together.
          </p>
          <p className="text-[17px] font-light leading-relaxed mb-6">
            Our team is made up of students with diverse skill sets — from front-end design to
            back-end architecture — united by a single goal: to build something meaningful. We
            believe that technology should not only solve problems, but also feel intuitive,
            responsive, and enjoyable. Every interaction should be thoughtful. Every line of code
            should serve a purpose.
          </p>

          <p className="text-[17px] font-light leading-relaxed mb-6">
            Being part of one of India’s premier institutions, we’re deeply rooted in a culture of
            learning and growth. Our environment encourages experimentation, sharpens
            problem-solving, and pushes us to go beyond the obvious. It’s this atmosphere that fuels
            our creative process and brings our ideas to life.
          </p>

          <p className="text-[17px] font-light leading-relaxed">
            Our aim is simple: create solutions that empower, educate, and inspire. Whether it's
            making academic processes smoother, helping faculty and students connect better, or
            simply making interfaces more human — we care about the details that make experiences
            seamless.
          </p>
          <p className="text-[17px] font-light leading-relaxed">
            We’re proud of what we’re building, but we’re even more excited about what’s next. This
            is just the beginning, and we invite you to be part of the journey.
          </p>
        </div>
        <style>{`
        @keyframes fall {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thumb-gray-400::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thumb-gray-400::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
          background-color: rgb(156 163 175);
          border-radius: 3px;
        }
        
        .dark .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
          background-color: rgb(75 85 99);
        }
        
        .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb:hover {
          background-color: rgb(107 114 128);
        }
      `}</style>
      </div>
      <div className="text-foreground bg-muted/10 pt-24">
        <section className="max-w-4xl mx-auto px-6 py-16 pt-8 pb-8">
          <div className=" flex justify-center">
            <div className="relative group">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-center tracking-widest">
                <span className="inline-block px-12 py-4 text-foreground relative overflow-hidden transition-all duration-500 ease-out hover:text-foreground">
                  About HorizonX
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground group-hover:w-full transition-all duration-700 ease-out"></span>
                </span>
              </h2>
            </div>
          </div>

          {/* Stylized opening blockquote */}
          <blockquote className="border-l-4 border-primary pl-4 italic text-lg mb-8 text-foreground">
            “Software should feel invisible — it should just work, beautifully.”
          </blockquote>

          <p className="text-[17px] font-light leading-relaxed mb-6">
            <strong className="font-semibold text-primary">HorizonX</strong> is a modern, intuitive
            platform designed to simplify digital workflows, enhance collaboration, and provide
            users with a frictionless experience across devices and services. Built with elegance
            and efficiency in mind, HorizonX bridges the gap between functionality and design —
            empowering individuals and teams to do more with less effort.
          </p>

          <hr className="my-6 border-muted-foreground/30" />

          <p className="text-[17px] font-light leading-relaxed mb-6">
            At its core, HorizonX is about minimizing digital clutter. Whether you're managing
            tasks, collaborating on content, or switching between tools, HorizonX offers a unified
            interface that adapts to your context. Its minimalist aesthetic, paired with powerful
            capabilities, helps you stay focused on what matters most — getting things done.
          </p>

          <p className="text-[17px] font-light leading-relaxed mb-6">
            One of HorizonX’ key strengths is its adaptive layout and smart component system. From
            responsive controls to dynamic dashboards, every element is designed for clarity and
            flow. The platform supports role-based views and personalization, ensuring that both
            beginners and power users feel right at home.
          </p>

          <p className="text-[17px] font-light leading-relaxed">
            But HorizonX isn’t just another tool — it’s a mindset. We believe great software gets
            out of your way. Whether you're planning, building, or exploring, HorizonX offers an
            environment where ideas flow naturally, collaboration thrives, and work feels
            effortless.
          </p>
        </section>
      </div>
      <section className="bg-muted/10 py-16 px-6 ">
        {/* Section Heading */}
        <div className="flex justify-center pt-8 pb-8">
          <div className="relative group ">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-center tracking-widest">
              <span className="inline-block px-12 py-4 text-foreground relative overflow-hidden transition-all duration-500 ease-out hover:text-foreground">
                Our Guiding Pillars
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground roup-hover:w-full transition-all duration-700 ease-out"></span>
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mx-auto leading-relaxed  text-center">
              We’re grateful for the unwavering support and mentorship from our esteemed faculty.
            </p>
          </div>
        </div>
        {/* Faculty Cards */}
        <div className="flex flex-wrap justify-center gap-16">
          {[
            { name: 'Prof. Santosh Biswas', role: '', img: '/team/santosh.jpg' },
            { name: 'Dr. Amit Kumar Dhar', role: '', img: '/team/amit.jpg' },
            { name: 'Dr. Gagan Raj Gupta', role: '', img: '/team/gagan.jpg' },
            { name: 'Dr. Anand Baswade', role: '', img: '/team/anand.jpg' },
          ].map((member, i) => (
            <div
              key={i}
              className="w-90 h-64 bg-background rounded-3xl shadow-md p-6 text-center transition-transform hover:scale-[1.02] hover:shadow-lg duration-300"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-muted-foreground/30"
              />
              <h3 className="text-xl font-medium text-foreground">{member.name}</h3>
              {member.role && <p className="text-sm text-muted-foreground">{member.role}</p>}
            </div>
          ))}
        </div>
      </section>
      <section className="bg-muted/10 py-16 px-6">
        {/* Headline */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-foreground"></h2>
          <p className="mt-2 text-lg text-muted-foreground"></p>
        </div>
        <div className="flex justify-center">
          <div className="relative group pt-8 pb-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-center tracking-widest">
              <span className="inline-block px-12 py-4 text-foreground relative overflow-hidden transition-all duration-500 ease-out hover:text-foreground">
                By the Team
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground roup-hover:w-full transition-all duration-700 ease-out"></span>
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mx-auto leading-relaxed  text-center">
              A passionate team turning bold ideas into intuitive experiences.
            </p>
          </div>
        </div>
        {/* Team Cards */}
        <div className="flex flex-wrap justify-center gap-16">
          {[
            { name: 'Sudeep Ranjan Sahoo', role: 'Team Lead', img: '/team/srs.jpg' },
            { name: 'Naman Sharma', role: 'Frontend Developer', img: '/team/naman.jpg' },
            { name: 'Rohit', role: 'Frontend Developer', img: '/team/rohit.jpg' },
            { name: 'Slok', role: 'Full Stack Developer', img: '/team/slok.jpg' },
            { name: 'Ujjwal Raj', role: 'Backend Developer', img: '/team/uj.jpg' },
          ].map((member, i) => (
            <div
              key={i}
              className="w-90 h-64 bg-background rounded-3xl shadow-lg p-6 text-center transition-transform hover:scale-[1.03] hover:shadow-xl duration-300"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-muted-foreground/30"
              />
              <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TerminalInterface;
