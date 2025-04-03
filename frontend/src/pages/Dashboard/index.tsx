import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer";

interface Content {
  id: string;
  title: string;
  description: string;
  url: string;
}

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState<Content[]>([]);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/content", {
          headers: {
            Authorization: `Bearer ${await currentUser?.getIdToken()}`,
          },
        });
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchContent();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {selectedContent ? (
            <div className="mb-8">
              <button
                onClick={() => setSelectedContent(null)}
                className="mb-4 text-indigo-600 hover:text-indigo-900"
              >
                ← Volver a la lista
              </button>
              <VideoPlayer
                url={selectedContent.url}
                title={selectedContent.title}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {content.map((item) => (
                <div
                  key={item.id}
                  className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setSelectedContent(item)}
                >
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.description}
                    </p>
                    <div className="mt-4">
                      <span className="text-indigo-600 hover:text-indigo-900">
                        Ver contenido →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
