import { useNavigate } from "react-router";
import { addToast, ToastProvider, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { ArrowLeft, Copy, Instagram, Twitter, Facebook, Linkedin, Share } from "lucide-react";
import { useCaptionStore } from "../store/captionStore";

const ResultsPage = () => {
  const navigate = useNavigate();

  // zustand hooks
  const imagePreview = useCaptionStore((state) => state.imagePreview);

  const isLoading = useCaptionStore((state) => state.isLoading);
  const error = useCaptionStore((state) => state.error);
  const captionResults = useCaptionStore((state) => state.captionResults);

  const resetAll = useCaptionStore((state) => state.resetAll);

  // Platform configurations
// Platform configurations
  const platforms = [
    {
      name: "Instagram",
      key: "instagram" as keyof typeof captionResults,
      icon: Instagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      textColor: "text-white"
    },
    {
      name: "Twitter/X",
      key: "twitter" as keyof typeof captionResults,
      icon: Twitter,
      color: "bg-black",
      textColor: "text-white"
    },
    {
      name: "WhatsApp",
      key: "whatsapp" as keyof typeof captionResults,
      icon: Share,
      color: "bg-green-500",
      textColor: "text-white"
    },
    {
      name: "Facebook",
      key: "facebook" as keyof typeof captionResults,
      icon: Facebook,
      color: "bg-blue-600",
      textColor: "text-white"
    },
    {
      name: "LinkedIn",
      key: "linkedin" as keyof typeof captionResults,
      icon: Linkedin,
      color: "bg-blue-700",
      textColor: "text-white"
    }
  ]

  const handleCopyCaption = async (caption: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(caption);
      // You can add a toast notification here
      console.log(`${platform} caption copied to clipboard!`);
    } catch (err) {
      console.error(`Failed to copy caption: ${err}`);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleStartOver = () => {
    resetAll();
    navigate('/');
  };

  // Redirect if no results
  if (!captionResults && !isLoading && !error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">No Results Found</h2>
          <p className="text-gray-600">Please upload an image first to generate captions.</p>
          <Button color="primary" onPress={handleBackToHome}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="fixed z-[100]">
        <ToastProvider placement="top-center" toastOffset={90} />
      </div>

      <div className="max-w-6xl mx-auto space-y-14">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onPress={handleBackToHome}
            startContent={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Home
          </Button>
          <Button 
            color="primary" 
            variant="flat"
            onPress={handleStartOver}
          >
            Start Over
          </Button>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <Card className="w-full max-w-md mx-auto">
            <CardBody className="p-0">
              <img 
                src={imagePreview} 
                alt="Uploaded image" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </CardBody>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Generating captions...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardBody>
              <p className="text-red-600 text-center">{error}</p>
            </CardBody>
          </Card>
        )}

        {/* Results */}
        {captionResults && (
          <div className="space-y-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Generated Captions</h1>
              <p className="text-gray-600 mt-2">Click to copy any caption to your clipboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map((platform) => {
                const caption = captionResults[platform.key];
                const Icon = platform.icon;
                
                return (
                  <Card 
                    key={platform.name} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    isPressable
                    onPress={() => {
                      handleCopyCaption(caption, platform.name);
                      addToast({
                        title: platform.name,
                        description: `${platform.name} Caption copied successfully`,
                        color: "success"
                      });
                    }}
                  >
                    <CardHeader className={`${platform.color} ${platform.textColor}`}>
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5" />
                        <span className="font-semibold">{platform.name}</span>
                      </div>
                      <Copy className="w-4 h-4 ml-auto" />
                    </CardHeader>
                    <CardBody>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {caption}
                      </p>
                      <div className="mt-3 text-xs text-gray-500">
                        {(caption as string ?? '').length} characters
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;