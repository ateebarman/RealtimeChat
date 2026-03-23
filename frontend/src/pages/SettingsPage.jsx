import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import { toast } from "react-hot-toast";
import { SettingsIcon, UserIcon } from "lucide-react";

const SettingsPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const avatarOptions = [
    "https://api.dicebear.com/6.x/bottts/svg?seed=avatar-1",
    "https://api.dicebear.com/6.x/bottts/svg?seed=avatar-2",
    "https://api.dicebear.com/6.x/bottts/svg?seed=avatar-3",
    "https://api.dicebear.com/6.x/bottts/svg?seed=avatar-4",
  ];

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    profilePic: avatarOptions.includes(authUser?.profilePic) ? authUser.profilePic : avatarOptions[0],
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
  });

  const { mutate: updateMutation, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-base-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="size-8 text-primary" />
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Picture</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {avatarOptions.map((avatar, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer border-2 rounded-lg p-2 transition-all ${
                      formData.profilePic === avatar
                        ? "border-primary bg-primary/10"
                        : "border-base-300 hover:border-primary/50"
                    }`}
                    onClick={() => setFormData({ ...formData, profilePic: avatar })}
                  >
                    <img
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="w-16 h-16 rounded-full mx-auto"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                rows="3"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Native Language</span>
              </label>
              <input
                type="text"
                name="nativeLanguage"
                value={formData.nativeLanguage}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="e.g., English"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Learning Language</span>
              </label>
              <input
                type="text"
                name="learningLanguage"
                value={formData.learningLanguage}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="e.g., Spanish"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="e.g., New York, USA"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;