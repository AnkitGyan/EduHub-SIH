import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/buttons/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAuthHeaders } from "@/api/auth";

const API_URL = "http://localhost:5000/api/communities";

export default function CommunityDetail() {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`, getAuthHeaders())
      .then(res => setCommunity(res.data.community))
      .catch(err => console.error(err));
  }, [id]);

  if (!community) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{community.name}</h1>
      <p className="text-gray-600">{community.description}</p>

      {/* Members */}
      <div className="mt-6">
        <h2 className="font-semibold">Members</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {community.members.map(m => (
            <Card key={m._id} className="px-3 py-2">
              <CardContent>
                {m.firstName} {m.lastName} ({m.classGrade})
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pending Invites */}
      {community.pendingInvites.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold">Pending Invites</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {community.pendingInvites.map(u => (
              <Card key={u._id} className="px-3 py-2">
                <CardContent>
                  {u.firstName} {u.lastName}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
