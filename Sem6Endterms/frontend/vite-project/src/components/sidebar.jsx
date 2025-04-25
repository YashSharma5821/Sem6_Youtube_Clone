import React from 'react';

const YouTubeSidebar = () => {
  const sidebarLinks = [
    { label: 'Home', url: '/', icon: 'home' },
    { label: 'Trending', url: '/trending', icon: 'trending_up' },
    { label: 'Subscriptions', url: '/subscriptions', icon: 'subscriptions' },
    { label: 'Library', url: '/library', icon: 'library_books' },
  ];

  return (
    <aside className="youtube-sidebar">
      <div className="sidebar-header">
        <img src="youtube_logo.png" alt="YouTube" />
      </div>
      <nav className="sidebar-navigation">
        <ul>
          {sidebarLinks.map((link, index) => (
            <li key={index} className="sidebar-link">
              <a href={link.url} className="sidebar-link-text">{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default YouTubeSidebar;