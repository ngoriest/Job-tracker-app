import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Replace with API call
    if (user) {
      const mockApplications = [
        {
          id: 1,
          company: 'Tech Corp',
          job_title: 'Frontend Developer',
          status: 'Interview',
          application_date: new Date(),
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          user_id: user.id
        }
      ];
      setApplications(mockApplications);
      setLoading(false);
    }
  }, [user]);

  const addApplication = (application) => {
    // TODO: Replace with API call
    const newApplication = {
      ...application,
      id: Math.floor(Math.random() * 1000),
      user_id: user.id,
      application_date: new Date()
    };
    setApplications([...applications, newApplication]);
    return Promise.resolve(newApplication);
  };

  const updateApplication = (id, updates) => {
    // TODO: Replace with API call
    setApplications(applications.map(app => 
      app.id === id ? { ...app, ...updates } : app
    ));
    return Promise.resolve();
  };

  const deleteApplication = (id) => {
    // TODO: Replace with API call
    setApplications(applications.filter(app => app.id !== id));
    return Promise.resolve();
  };

  return (
    <ApplicationContext.Provider 
      value={{ 
        applications, 
        loading, 
        addApplication, 
        updateApplication, 
        deleteApplication 
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => useContext(ApplicationContext);