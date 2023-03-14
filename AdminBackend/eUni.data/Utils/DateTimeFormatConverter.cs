using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace eUni.data.Utils;

public class DateTimeFormatConverter : JsonConverter<DateTime>
{
    public override DateTime Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options)
    {
        Console.WriteLine($"xxxxxxxxxxx {reader.GetString()}");
        return DateTime.ParseExact(reader.GetString()!,
            "MM/dd/yyyy", CultureInfo.InvariantCulture);

    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(
                    "MM/dd/yyyy", CultureInfo.InvariantCulture));
    }
}