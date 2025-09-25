import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuthHeaders } from "@/api/auth";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/communities";

export default function CommunityList() {
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API_URL, getAuthHeaders())
      .then(res => setCommunities(res.data.communities))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Communities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {communities.map(c => (
          <Card key={c._id} className="shadow-md hover:shadow-lg transition">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{c.name}</h2>
              <p className="text-gray-600">{c.description}</p>
              <p className="text-sm text-gray-400">
                Members: {c.members.length}
              </p>
              <Button 
                className="mt-2"
                onClick={() => navigate(`/communities/${c._id}`)}
              >
                View Community
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
