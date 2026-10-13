export const sampleData = {
  ambassadors: [
    { id: 1, name: 'Maya Singh', degreeProgram: 'International Business Administration', bio: 'Maya helps prospective students understand business studies and campus life in Berlin.', availability: 'Weekdays', contactPreference: 'email', status: 'active' },
    { id: 2, name: 'Luka Beridze', degreeProgram: 'Computer Science', bio: 'Luka supports students interested in technology programs and moving to Berlin.', availability: 'Evenings', contactPreference: 'video_call', status: 'active' },
    { id: 3, name: 'Anna Keller', degreeProgram: 'Hospitality Management', bio: 'Anna shares experience from hospitality projects and student events.', availability: 'Weekends', contactPreference: 'email', status: 'active' },
    { id: 4, name: 'Samir Patel', degreeProgram: 'Computer Science', bio: 'Samir answers questions about labs, projects, and student jobs.', availability: 'Flexible', contactPreference: 'chat', status: 'active' },
    { id: 5, name: 'Nino Chkheidze', degreeProgram: 'International Business Administration', bio: 'Nino helps with questions about international student onboarding.', availability: 'Weekdays', contactPreference: 'email', status: 'active' }
  ],
  programs: [
    { id: 1, programName: 'International Business Administration', degreeLevel: 'Bachelor', department: 'Business', description: 'Business studies with international and practical focus.' },
    { id: 2, programName: 'Computer Science', degreeLevel: 'Master', department: 'Technology', description: 'Advanced software engineering, data, and digital systems.' },
    { id: 3, programName: 'Hospitality Management', degreeLevel: 'Bachelor', department: 'Management', description: 'Service, tourism, and hospitality management in an international context.' }
  ],
  events: [
    { id: 1, title: 'Online Ambassador Q&A', dateTime: '2026-07-08T16:00:00.000Z', locationOrLink: 'https://meet.example/srh-qa', description: 'Open question session with current SRH students.', eventType: 'online_qa', interestedCount: 34 },
    { id: 2, title: 'Berlin Campus Tour', dateTime: '2026-07-15T11:00:00.000Z', locationOrLink: 'SRH Berlin Campus', description: 'Guided tour for prospective students and families.', eventType: 'campus_tour', interestedCount: 51 },
    { id: 3, title: 'International Student Welcome Talk', dateTime: '2026-08-03T14:00:00.000Z', locationOrLink: 'Auditorium A', description: 'Ambassadors explain first-week essentials.', eventType: 'welcome', interestedCount: 27 },
    { id: 4, title: 'Data Club Project Night', dateTime: '2026-08-14T17:00:00.000Z', locationOrLink: 'Lab 2.04', description: 'Bring a dataset and build a tiny dashboard with other students.', eventType: 'club_meetup', interestedCount: 42, club: { name: 'Data & AI Club' } }
  ],
  clubs: [
    { id: 1, name: 'Data & AI Club', category: 'Technology', description: 'Student-led projects, talks, and study circles around data science and applied AI.', status: 'active', memberCount: 38 },
    { id: 2, name: 'Founders Club', category: 'Entrepreneurship', description: 'A place to test ideas, meet co-founders, and prepare pitch nights.', status: 'active', memberCount: 24 },
    { id: 3, name: 'Hospitality Culture Club', category: 'Campus Life', description: 'Pop-up tastings, venue visits, and service design conversations.', status: 'active', memberCount: 19 }
  ],
  clubPolls: [
    { id: 1, title: 'Should SRH start a Film Club?', clubIdea: 'Film Club', description: 'Weekly screenings and student discussion nights.', interestCount: 31, popularityThreshold: 25, status: 'popular' },
    { id: 2, title: 'Interest check: Robotics Club', clubIdea: 'Robotics Club', description: 'Build small robots and prepare showcase demos.', interestCount: 18, popularityThreshold: 25, status: 'open' }
  ],
  faqs: [
    { id: 1, title: 'How do I contact an ambassador?', body: 'Use the inquiry form and select your program and preferred language.' },
    { id: 2, title: 'Can I ask in German?', body: 'Yes. Choose German as preferred language if an ambassador is available.' },
    { id: 3, title: 'Are campus tours available?', body: 'Campus tours are listed on the events page.' },
    { id: 4, title: 'Which program should I choose?', body: 'Start with the program overview and ask an ambassador for personal experience.' },
    { id: 5, title: 'What happens after I submit an inquiry?', body: 'A coordinator reviews it and assigns a suitable ambassador.' }
  ]
};
