
const ImageUrl = "http://127.0.0.1:8000/medias/"

export const GetImageUrl = (imageName: string): string => {
    return ImageUrl + imageName;
}