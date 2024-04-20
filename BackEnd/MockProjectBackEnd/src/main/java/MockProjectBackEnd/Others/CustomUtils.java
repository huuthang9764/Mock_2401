package MockProjectBackEnd.Others;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CustomUtils {
    public static String convertDateToString(Date date){
        if (date != null){
            // Định dạng ngày theo yyyy-MM-dd
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            return sdf.format(date);
        }
        return null;
    }
}
